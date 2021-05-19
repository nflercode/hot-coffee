import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import tableService from '../../services/table-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';

const JoinPage = () => {
    const dispatch = useDispatch();
    const tableState = useSelector(state => state.table);
    const authState = useSelector(state => state.auth);
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
            const { data } = await tableService.joinTable(tableState.invitationToken);

            dispatch({type: "CREATE_TABLE", table: data.table});
            dispatch({type: "CREATE_AUTH_TOKEN", authToken: data.authToken});
            dispatch({type: "CREATE_REFRESH_TOKEN", refreshToken: data.refreshToken});

            refreshTokenStorage.setRefreshToken(data.refreshToken);

            history.push('/lobby');
        }

        joinTable();
    }

    const annanOrAndra = (tableState.players || []).length === 1 ? 'annan' : 'andra';
    return authState.authToken.token ? renderAlreadyMember(tableState) : (
        <div>
            <header>
                <span>url: {window.origin}/join/{tableState.invitationToken}</span>
            </header>
            <main>
                <div>
                    <span>{(tableState.players || []).length} {annanOrAndra} sitter vid det här bordet</span>
                </div>
                <div>
                    <button onClick={handleJoinTableButtonClick}>Anslut till bord</button>
                </div>
            </main>
        </div>
    );
};

function renderAlreadyMember(table) {
    return (
        <div>Du är redan medlem i ett bord. Gå till <Link to="/lobby">lobbyn</Link> och lämna om du vill delta i detta bord istället.</div>
    );
}

export default JoinPage;