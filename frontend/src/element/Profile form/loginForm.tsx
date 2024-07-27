import React from "react";
import { ILoginForm } from "./interface";
import { Button, Input } from "../../component";

const LoginForm: ILoginForm = () => {
    return (
        <form>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="email" />
            <Input placeholder="Password" type="password" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Position" />
            <Input placeholder="City" />
            <Input placeholder="Country" />
            <Button>Submit</Button>
        </form>
    )
}

export default LoginForm;