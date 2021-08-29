const tableSelector = ({ table }) => table;

const playersSeletor = (state) => {
    const table = tableSelector(state);
    return table.players;
};

const playerMeSelector = (state) => {
    const players = playersSeletor(state);
    return players?.find((p) => p.isMe);
};

export { tableSelector, playerMeSelector, playersSeletor };
