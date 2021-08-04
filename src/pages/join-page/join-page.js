import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import tableService from '../../services/table-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';
import {Button} from '../../components/button/button';
import { Input } from '../../components/input-field/input';
import playerService from '../../services/player-service';
import './join-page.css';

const JoinPage = () => {
    const dispatch = useDispatch();
    const tableState = useSelector(state => state.table);
    const authState = useSelector(state => state.auth);
    const [playerName, setPlayerName] = useState('');
    const { invitationToken } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function getTable() {
            const { data } = await tableService.getTableByInvitationToken(invitationToken)
            dispatch({type: "CREATE_TABLE", table: data });
        }

        getTable();
    }, [invitationToken, dispatch]);

    function handleJoinTableButtonClick() {
        async function joinTable() {
            const { data } = await tableService.joinTable(tableState.invitationToken, playerName);

            dispatch({type: "CREATE_TABLE", table: data.table});
            dispatch({type: "CREATE_AUTH_TOKEN", authToken: data.authToken});
            dispatch({type: "CREATE_REFRESH_TOKEN", refreshToken: data.refreshToken});

            refreshTokenStorage.setRefreshToken(data.refreshToken);

            history.push('/lobby');
        }

        joinTable();
    }

    
    const handleCopy = () => {
        const copyText = document.querySelector("#copy-input").querySelector("input");

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand("copy");
    };


    if(authState.authToken.token) return (
        <main className="join-page-main">
            <p>Det ser ut som att du är med i ett bord redan</p>
                <div className="start-page-leave-or-join">
                  <Button  onClick={() => history.push('/lobby')}>Till lobby</Button>
                  Eller
                  <Button theme="negative" onClick={handleLeaveTable}>Lämna</Button>
                </div>
        </main>
    );
    
    function handleLeaveTable() {
        async function leave() {
          await playerService.deletePlayer(authState.authToken.token);
          refreshTokenStorage.deleteRefreshToken();
          dispatch({ type: "PLAYER_LEFT_TABLE" });
          history.push('/');
        }
    
        leave();
      }
    const annanOrAndra = (tableState.players || []).length === 1 ? 'annan' : 'andra';
    return (
        <main className="join-page-main">
            <h2>Anslut till bord</h2>
            <div className="join-page-main-connect-url">
                <Input id="copy-input" label="Delbar länk" type="text" isReadOnly value={`${window.origin}/join/${tableState.invitationToken}`}/>
                <Button onClick={handleCopy}>Copy</Button>
            </div>
            <Input label="Alias" type="text" value={playerName} onDebouncedChange={(val) => setPlayerName(val)} />
            <div>
                <span>{(tableState.players || []).length} {annanOrAndra} sitter vid det här bordet</span>
            </div>
            <div className="join-page-done-btn">
                <Button block onClick={handleJoinTableButtonClick}>Anslut till bord</Button>
            </div>
        </main>
    );
};

export default JoinPage;