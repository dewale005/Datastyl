const { StatusCodes } = require("http-status-codes"); // Import HTTP status codes for response handling
const db = require("../sql/db"); // Import the database connection pool
const ApiError = require("../util/ApiError"); // Import a custom error class for API error handling

/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The user's password (usually hashed).
 * @property {string} country - The country of the user.
 * @property {string} city - The city of the user.
 * @property {string} phone_number - The phone number of the user.
 * @property {string} position - The job position of the user.
 * @property {date} created_at - The date and time when the user was created.
 * @property {date} updated_at - The date and time when the user was last updated.
 */

/**
 * @typedef {Object} Fields
 * @property {number} [id] - The unique identifier of the record.
 * @property {string} [first_name] - The first name of the user.
 * @property {string} [last_name] - The last name of the user.
 * @property {string} [email] - The email address of the user.
 * @property {string} [password] - The user's password (usually hashed).
 * @property {string} [country] - The country of the user.
 * @property {string} [city] - The city of the user.
 * @property {string} [phone_number] - The phone number of the user.
 * @property {string} [position] - The job position of the user.
 */

class DbQuery {
  /**
   * Constructor to initialize the DbQuery instance with a specific table.
   * @param {string} table - The name of the table to operate on.
   */
  constructor(table) {
    this.table = table;
  }

  /**
   * Insert data into the specified table.
   * 
   * @param {Fields} fields - Data to insert (keys should match column names).
   * @returns {Promise<User>} - The inserted row.
   */
  async create(fields) {
    // Get the column names from the fields object
    const columns = Object.keys(fields);
    // Get the values from the fields object
    const values = Object.values(fields);

    // Construct the SQL query dynamically
    const query = `
      INSERT INTO ${this.table} (${columns.join(", ")})
      VALUES (${columns.map((_, idx) => `$${idx + 1}`).join(", ")})
      RETURNING *;
    `;

    try {
      // Check if a user with the same email already exists
      const existingUser = await this.findBy({ email: fields.email });
      if (existingUser[0]) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          `User with email: ${fields.email} already exists`
        );
      }
      // Execute the query with the provided values
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      // Rethrow the error to be handled by the calling function
      throw new ApiError(
        err.statusCode || 500,
        err.message || "Something went wrong"
      );
    }
  }

  /**
   * Query records from the specified table based on the given fields.
   * 
   * @param {Fields} fields - An object containing the fields and their values to query by.
   * @returns {Promise<User[]>} - A promise that resolves to an array of matching records.
   */
  async findBy(fields = {}) {
    // Base query to select all fields from the table
    let query = `SELECT id, first_name, last_name, email, country, city, phone_number, position FROM ${this.table}`;
    const values = [];

    // If search parameters are provided, add a WHERE clause
    if (Object.keys(fields).length > 0) {
      const conditions = [];
      let index = 1; // Index for parameterized query

      for (const [field, value] of Object.entries(fields)) {
        conditions.push(`${field} = $${index}`);
        values.push(value);
        index++;
      }

      // Add the WHERE clause to the query
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    try {
      // Execute the query with the constructed query string and values
      const result = await db.query(query += ` ORDER BY id DESC`, values);
      return result.rows; // Return the result rows
    } catch (err) {
      // Rethrow the error to be handled by the calling function
      throw new ApiError(
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        err.message || "Something went wrong"
      );
    }
  }

  /**
   * Query a single record from the specified table based on the given fields.
   * 
   * @param {Fields} fields - An object containing the fields and their values to query by.
   * @returns {Promise<User>} - A promise that resolves to a single matching record.
   */
  async findOneBy(fields) {
    // Use findBy and return the first record
    const results = await this.findBy(fields);
    return results[0];
  }

  /**
   * Update a record in the specified table by its ID.
   * 
   * @param {Fields} data - An object containing the data to update.
   * @param {number|string} id - The ID of the record to update.
   * @returns {Promise<User>} - The updated record.
   */
  async updateById(data, id) {
    // Remove the password from the data to prevent updating it
    delete data.password;

    // Construct the SET part of the SQL query
    const setClauses = Object.keys(data)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Prepare values for the query
    const values = Object.values(data);
    values.push(id); // Add ID to values for the WHERE clause

    // Construct the full SQL query
    const query = `
      UPDATE ${this.table}
      SET ${setClauses}, updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING *;
    `;


    try {
      // Check if the record exists before updating
      const existingRecord = await this.findBy({ id });
      if (!existingRecord[0]) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `User with ID: ${id} not found`
        );
      }
      // Execute the query with the values
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      // Rethrow the error to be handled by the calling function
      throw new ApiError(
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        err.message || "Something went wrong"
      );
    }
  }

  /**
   * Delete a record from the specified table by its ID.
   * 
   * @param {number|string} id - The ID of the record to delete.
   * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
   */
  async delete(id) {
    // Define the SQL query to delete the record
    const query = `DELETE FROM ${this.table} WHERE id = $1`;

    try {
      // Check if the record exists before deleting
      const existingRecord = await this.findBy({ id });
      if (!existingRecord[0]) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `User with ID: ${id} not found`
        );
      }
      // Execute the query to delete the record
      await db.query(query, [id]);
      return existingRecord[0];
    } catch (err) {
      // Rethrow the error to be handled by the calling function
      throw new ApiError(
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        err.message || "Something went wrong"
      );
    }
  }
}

module.exports = DbQuery;
