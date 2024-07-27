import React from "react";
import {
  Table as MUITable,
  TableHead as MUITableHead,
  TableRow as MUITableRow,
  TableCell as MUITableCell,
  TableBody as MUITableBody,
  TableContainer as MUITableContainer,
  Paper,
} from "@mui/material";
import { Stack } from "../Stack";
import { IconButton } from "../Button";
import { DeleteForever, EditNote } from "@mui/icons-material";

// Define type aliases for the ref and props of each MUI table component
type TableRef = React.ElementRef<typeof MUITable>;
type TableProps = React.ComponentPropsWithoutRef<typeof MUITable>;

type TableHeadRef = React.ElementRef<typeof MUITableHead>;
type TableHeadProps = React.ComponentPropsWithoutRef<typeof MUITableHead>;

type TableRowRef = React.ElementRef<typeof MUITableRow>;
type TableRowProps = React.ComponentPropsWithoutRef<typeof MUITableRow>;

type TableCellRef = React.ElementRef<typeof MUITableCell>;
type TableCellProps = React.ComponentPropsWithoutRef<typeof MUITableCell>;

type TableBodyRef = React.ElementRef<typeof MUITableBody>;
type TableBodyProps = React.ComponentPropsWithoutRef<typeof MUITableBody>;

type TableContainerRef = React.ElementRef<typeof MUITableContainer>;
type TableContainerProps = React.ComponentPropsWithoutRef<typeof MUITableContainer>;

// Define a forwardRef component for each MUI table element with TypeScript typing
const Table = React.forwardRef<TableRef, TableProps>((props, ref) => (
  <MUITable stickyHeader ref={ref} {...props} />
));
Table.displayName = "Table";

const TableHead = React.forwardRef<TableHeadRef, TableHeadProps>((props, ref) => (
  <MUITableHead ref={ref} {...props} />
));
TableHead.displayName = "TableHead";

const TableRow = React.forwardRef<TableRowRef, TableRowProps>((props, ref) => (
  <MUITableRow ref={ref} {...props} />
));
TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<TableCellRef, TableCellProps>((props, ref) => (
  <MUITableCell ref={ref} {...props} />
));
TableCell.displayName = "TableCell";

const TableBody = React.forwardRef<TableBodyRef, TableBodyProps>((props, ref) => (
  <MUITableBody ref={ref} {...props} />
));
TableBody.displayName = "TableBody";

const TableContainer = React.forwardRef<TableContainerRef, TableContainerProps>((props, ref) => (
  <MUITableContainer component={Paper} ref={ref} {...props} />
));
TableContainer.displayName = "TableContainer";

// Type for column configuration
interface Column<T> {
  id: keyof T; // Key to access the data in the row
  label: string; // Header label
}

// Props type for the dynamic table
interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onClickRow?: (value: T) => void;
  handleDelete?: (id: number) => void;
}

// Define the DynamicTable component as a generic functional component
const GridTable = <T,>({ columns, data, onClickRow, handleDelete }: DynamicTableProps<T>) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {/* Render table headers dynamically */}
            {columns.map((column) => (
              <TableCell key={column.id as string} sx={{ fontWeight: "bold" }}>
                {column.label}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render table rows dynamically */}
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id as string}>
                  {(row as any)[column.id]}
                </TableCell>
              ))}
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton onClick={() => onClickRow?.(row)} color="primary">
                    <EditNote />
                  </IconButton>
                  <IconButton onClick={() => handleDelete?.((row as any).id as number)} color="secondary">
                    <DeleteForever />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Export the defined components
export { GridTable };
