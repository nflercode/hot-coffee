import React, { useState } from "react";
import PropTypes from 'prop-types';
import DebounceInput from "../../../components/form/scripts/debounce-input";
import {validateEmail, validatePassword} from "../../../components/form/scripts/validations.js";
import "../styles/login-user-page.css";

export default function LoginUserPage({ onLoginUser, loading, success}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasRequestedLogin, setHasRequestedLogin] = useState(false);

    const handleOnClick = () => {
        setHasRequestedLogin(true);
        onLoginUser(email, password)
    }

    return (
        <div className="login-wrapper">
            <span>Logga in här om du vill</span>
            <div className="login-wrapper-inner">
                <label>Email</label>
                <DebounceInput onValidate={validateEmail} onChange={setEmail} type="email" />
                <label>Lösenord</label>
                <DebounceInput onValidate={validatePassword} onChange={setPassword} type="password" />
                <button onClick={handleOnClick}>Logga in</button>
            </div>
        </div>
    );
}

LoginUserPage.propTypes = {
    onLoginUser: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    success: PropTypes.bool
}