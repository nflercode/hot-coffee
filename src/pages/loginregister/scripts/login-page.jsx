import React from "react";
import DebounceInput from "../../../components/form/scripts/debounce-input";
import {validateEmail} from "../../../components/form/scripts/validations.js";
export default function LoginPage() {
    return (
        <div>
            Logga in här om du vill
            <DebounceInput onValidate={(val) => validateEmail(val)} type="email" />
            <DebounceInput onValidate={(val) => validateEmail(val)} type="email" />
        </div>
    );
}