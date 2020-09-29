import React from "react";
import DebounceInput from "../../../components/form/scripts/debounce-input";
import {validatePassword} from "../../../components/form/scripts/validations.js";
import {register} from "../../../services/user/register";

export default function RegisterPage() {
    let email, password;
    return (
        <div>
            Registrera dig här om du vill
            <DebounceInput onValidate={(val) => email = val} type="email" />
            <DebounceInput onValidate={(val) => password = val} type="password" />
            <DebounceInput onValidate={validatePassword} type="password" />
            <button onClick={() => {
                const status = register(email, password);
                console.log(status);
            }}>Registrera</button>
        </div>
    );
}