import React, { useState } from 'react';
import './style.css'
import {  useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export const StartPage = () => {
  const [invitationToken, setInvitationToken] = useState("");
  const history = useHistory();
  const authState = useSelector((state) => state.auth);

  function handleCreateTableButtonClick() {
    if (!authState.authToken.token) {
      history.push('/create');
    } else {
      history.push('/lobby');
    }
  }

  function handleInvitationTokenClick() {
    history.push(`/join/${invitationToken}`);
  }

  const createOrReturnToTable = authState.authToken.token ? 'Tillbaka till bordet' : 'Skapa bord';
  return (
    <div className="start-page-container">
      <header className="start-page-header">
        <h1 className="start-page-header-title"><b>n</b>fler</h1>
        <span className="start-page-header-sub-title">Your chip's online</span>
      </header>
      <main className="start-page-main">
        {!authState.authToken.token && (
          <>
          <div className="start-page-main-inv-link-container">
            <input className="start-page-main-inv-link-input" type="text" onChange={(e) => setInvitationToken(e.target.value)} value={invitationToken} />
            <button className="start-page-main-inv-link-button" onClick={handleInvitationTokenClick}>Gå med</button>
          </div>
          <span className="start-page-main-or">Eller</span>
          </>
        )}
        <div>
          <button className="start-page-main-create-table-button" onClick={handleCreateTableButtonClick}>{createOrReturnToTable}</button>
        </div>
      </main>
    </div>
  );
}