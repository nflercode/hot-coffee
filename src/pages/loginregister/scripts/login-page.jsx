import React from "react";
import DebounceInput from "../../../components/form/scripts/debounce-input";
import {validateEmail, validatePassword} from "../../../components/form/scripts/validations.js";

export default function LoginPage() {
    return (
        <div>
            Logga in här om du vill
            <DebounceInput onValidate={validateEmail} type="email" />
            <DebounceInput onValidate={validatePassword} type="password" />
        </div>
    );
}