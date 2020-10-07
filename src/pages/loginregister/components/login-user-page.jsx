import React, { useState } from "react";
import PropTypes from 'prop-types';
import DebounceInput from "../../../components/form/scripts/debounce-input";
import {validateEmail, validatePassword} from "../../../components/form/scripts/validations.js";
import "../styles/login-user-page.css";

export default function LoginUserPage({ onLoginUser, loading, success}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasRequestedLogin, setHasRequestedLogin] = useState(false);

    const handleOnClick = () => {
        setHasRequestedLogin(true);
        onLoginUser(username, password)
    }

    return (
        <div className="login-wrapper">
            <span>Logga in här om du vill {hasRequestedLogin && (success ? <div>Du är inloggad!</div> : <div>Det gick inte att logga in!</div>)}</span>
            <div className="login-wrapper-inner">
                <label>Email</label>
                <DebounceInput onValidate={validateEmail} onChange={setUsername} type="email" />
                <label>Lösenord</label>
                <DebounceInput onValidate={validatePassword} onChange={setPassword} type="password" />
                <button onClick={handleOnClick}>Logga in</button>
            </div>
        </div>
    );
}

LoginUserPage.propTypes = {
    onLoginUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired
}