const gameSelector = ({game}) => game;

const participantsSelector = (state) => {
    const game = gameSelector(state);
    return game.participants;
};

const myParticipantSelector = (state, playerId) => {
    const participants = participantsSelector(state);
    return participants?.find((participant) => participant.playerId === playerId);
};

export {gameSelector,myParticipantSelector, participantsSelector};