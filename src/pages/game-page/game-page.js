import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tableService from '../../services/table-service';

import { DialogsContext } from '../../components/dialogs/dialogs-context';

import './style.css';
import gameService from '../../services/game-service';
import { GAME_CREATED } from '../../store/reducers/game-reducer';
import chipService from '../../services/chips-service';
import { CHIPS_FETCHED } from '../../store/reducers/chips-reducer';
import { POT_REQUEST_FETCHED } from '../../store/reducers/pot-request';

import { Button } from '../../components/button/button';
import { ChipList } from '../../components/chip-list/chip-list';
import { Player } from '../../components/player/player';
    
const GamePage = () => {
  const tableState = useSelector(state => state.table);
  const authState = useSelector(state => state.auth);
  const gameState = useSelector(state => state.game);
  const chipsState = useSelector(state => state.chips);
  const potRequestState = useSelector(state => state.potRequest);
  const dialogerinos = useContext(DialogsContext);
  
  const [currentBettingChips, setCurrentBettingChips] = useState({});

  const dispatch = useDispatch();

  const mapChipWithActualChip = (chip) => {
    const actualChip = chipsState.find((actualChip => actualChip.id === chip.chipId));
              
    return {
      ...actualChip,
      ...chip
    }
  };
  const memoizedMeId = useMemo(() => 
    ((tableState.players || []).find(p => p.isMe) || {}).id
, [tableState.players]);

const participantMe = useMemo(() => {
  return (gameState.participants || []).find((participant) => participant.playerId === memoizedMeId);
},
  [gameState.participants, memoizedMeId])

  const memoizedOrderedPlayersClasses = useMemo(() => {
    if (!(tableState.players && gameState.participants))
      return [];

    const leftTopRight = ['left', 'top', 'right'];
    return gameState.participants.filter(p => p.playerId !== memoizedMeId)
        .sort((a, b) => a.turnOrder - b.turnOrder)
        .map((p, i) => ({ playerId: p.playerId, className: leftTopRight[i] }));
  }, [gameState, tableState]);

  const memoizedPlayersWithParticipants = useMemo(() => {
    if (!(tableState.players && gameState.participants && chipsState))
      return [];

    return tableState.players.map((player) => {
      const participant = gameState.participants.find((participant) => participant.playerId === player.id);

      return {
        ...participant,
        chips: participant.chips.map(mapChipWithActualChip),
        ...player
      };
    });
  }, [tableState.players, gameState.participants, chipsState]);


  useEffect(() => {
    if(participantMe?.isCurrentTurn) {
      dialogerinos.onShowDialog({
        type: "ALERT",
        title: "Det är din tur!",
        icon: "fa-dice"
      }); 
    }
  }, [participantMe, dialogerinos])


  useEffect(() => {
    if (potRequestState.status !== "AWAITING") {
      return;
    }

    const requestingPlayer = memoizedPlayersWithParticipants.find(p => p.playerId === potRequestState.playerId);
    if (!requestingPlayer || requestingPlayer.isMe) {
      return;
    }

    const isMePlayer = memoizedPlayersWithParticipants.find(p => p.isMe);
    const myAnswer = potRequestState.participantAnswers.find(p => p.playerId === isMePlayer.playerId);
    if (myAnswer && myAnswer.answer !== 'AWAITING') {
      return;
    }

    dialogerinos.onShowDialog({
        mode:"info",
        positiveButtonProp: {
            callback: () => {gameService.updatePotRequest(authState.authToken.token, potRequestState.id, "OK")},
            content:"I accept"
        },
        negativeButtonProp: {
          callback: () => {gameService.updatePotRequest(authState.authToken.token, potRequestState.id, "NO")},
          content: 'I deny'
        },
        message: `${requestingPlayer.name} are requesting to receive the pot. Do you give permission?`,
        title: `${requestingPlayer.name} are requesting the pot.`
    });
  }, [memoizedPlayersWithParticipants, potRequestState]);

  const memoizedPotChips = useMemo(() => {
    if (!(gameState.pot && chipsState))
      return [];

    return gameState.pot.map(mapChipWithActualChip);
  }, [gameState.pot, chipsState]);

  useEffect(() => {
    async function getTable() {
        const tableResp = await tableService.getTable(authState.authToken.token);
        dispatch({ type: "CREATE_TABLE", table: tableResp.data });

        const ongoingGameResp = await gameService.getGameOngoing(authState.authToken.token);
        dispatch({ type: GAME_CREATED, game: ongoingGameResp.data.game });

        const chipsResponse = await chipService.getChips(authState.authToken.token);
        dispatch({ type: CHIPS_FETCHED, chips: chipsResponse.data.chips });

        const potRequestData = await gameService.getAwaitingPotRequest(authState.authToken.token, ongoingGameResp.data.game.id);
        if (potRequestData.data.potRequest)
          dispatch({ type: POT_REQUEST_FETCHED, potRequest: potRequestData.data.potRequest})
    }

    if (authState.authToken.token)
        getTable();

  }, [authState.authToken, dispatch]);

  function handleChipClick(chip, incDec) {
    const newAmount = (currentBettingChips[chip.chipId] || 0)+incDec;
    if (newAmount < 0 || newAmount > chip.amount) {
      return;
    }

    setCurrentBettingChips({
      ...currentBettingChips,
      [chip.chipId]: newAmount 
    });
  }

  return (
      <div className="game-page-container">
          <main className="game-page-main">
            <div className="game-page-pot-container">
              <ChipList
                chips={memoizedPotChips}
                hasEnabledChips={false}
                onClick={() => {}}
                styleDirection={'row'}
              />
              <Button
                disabled={memoizedPotChips.length === 0}
                onClick={() => gameService.createPotRequest(authState.authToken.token, gameState.id)}
                >
                ( )
              </Button>
            </div>
              {
                memoizedPlayersWithParticipants && memoizedPlayersWithParticipants.map((playerParticipant) => {
                  const classObj = memoizedOrderedPlayersClasses.find(p => p.playerId === playerParticipant.id);

                  let classes = 'game-page-participant-container';
                  if (playerParticipant.isMe)
                    classes += ' current-participant';
                  else
                    classes += ` participant-section-${classObj.className}`;

                  return (
                    <div className={classes}>
                      <div>
                        <Player playerParticipant={playerParticipant} />
                      </div>
                      <ChipList
                        chips={playerParticipant.chips}
                        hasEnabledChips={playerParticipant.isMe && playerParticipant.isCurrentTurn}
                        currentBettingChips={currentBettingChips}
                        onChipClick={(clickedChip) => handleChipClick(clickedChip, 1)}
                        onReduceClick={(reducedChip) => handleChipClick(reducedChip, -1)}
                        larger={playerParticipant.isMe}
                      />
                      {playerParticipant.isMe && (
                        <div className="participant-section-button-group">
                          <Button disabled={!playerParticipant.isCurrentTurn} onClick={() => {
                            gameService.raise(authState.authToken.token, gameState.id,
                              Object.keys(currentBettingChips).map((id) => ({
                                chipId: id,
                                amount: currentBettingChips[id]
                              })));
                            setCurrentBettingChips({});
                          }}>Call</Button>
                          <Button disabled={!playerParticipant.isCurrentTurn} onClick={() => {
                            gameService.raise(authState.authToken.token, gameState.id,
                              Object.keys(currentBettingChips).map((id) => ({
                                chipId: id,
                                amount: currentBettingChips[id]
                              })));
                            setCurrentBettingChips({});
                          }}>Raise</Button>
                          <Button
                            disabled={!playerParticipant.isCurrentTurn}
                            theme="neutral"
                            onClick={() => gameService.check(authState.authToken.token, gameState.id)}>
                            Check
                          </Button>
                          <Button theme="negative" disabled={!playerParticipant.isCurrentTurn}>
                            Fold
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })
              }
          </main>
      </div>
    );
};

export default GamePage;