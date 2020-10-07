import React, { useState } from "react";
import PropTypes from 'prop-types';
import DebounceInput from "../../../components/form/scripts/debounce-input";
import {validatePassword, validateEmail} from "../../../components/form/scripts/validations.js";
import "../styles/create-user-page.css";

export default function CreateUserpage({ onCreateUser, loading, success }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasRequestedCreateUser, setHasRequestedCreatedUser] = useState(false);

    const handleOnClick = () => {
        setHasRequestedCreatedUser(true);
        onCreateUser(username, password);
    }

    return (
        <div className="create-user-wrapper">
            <span>Registrera dig här om du vill {hasRequestedCreateUser && (success ? <div>Du är registrerad!</div> : <div>Registreringen misslyckades!</div>)}</span>
                <div className="create-user-wrapper-inner">
                <label>Email</label>
                <DebounceInput onValidate={validateEmail} onChange={setUsername} type="email" />
                <label>Lösenord</label>
                <DebounceInput onValidate={validatePassword} onChange={setPassword} type="password" />
                <label>Repetera lösenord</label>
                <DebounceInput onValidate={(value) => value === password} type="password" />
                <button onClick={handleOnClick} disabled={loading}>Registrera</button>
            </div>
        </div>
    );
}

CreateUserpage.propTypes = {
    onCreateUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired
}