/** 
 * Combined selectors for gamestate + tablestate
 */

import { chipSelector } from "./chip-state";
import { gameSelector, participantsSelector } from "./game-state";
import { playersSeletor } from "./table-state";

const participantPlayerSelector = (state) => {
    const players = playersSeletor(state);
    const participants = participantsSelector(state);
    const chipsState = chipSelector(state);
    
    if (!(players && participants && chipsState))
    return [];

    const mapChipWithActualChip = (chip) => {
        const actualChip = chipsState.find(((actualChip) => actualChip.id === chip.chipId));
                  
        return {
          ...actualChip,
          ...chip
        }
      };

  const mappedPlayers = players.map((player) => {
    const participant = participants.find((participant) => participant.playerId === player.id);
    const mappedChips = participant.chips.map(mapChipWithActualChip);

    let totalValue = 0;
    mappedChips.forEach((chip) => {totalValue = totalValue + (chip.amount * chip.value)})

    return {
      ...participant,
      ...player,
      chips: mappedChips,
      totalValue
    };
  });

  let highestValuePlayer = {value: null, player: null};
  let lowestValuePlayer = {value: null, player: null};
  
  mappedPlayers.forEach(({totalValue, playerId}) => {
    if (highestValuePlayer.value === null || totalValue > highestValuePlayer.value ) {
      highestValuePlayer.value = totalValue;
      highestValuePlayer.player = playerId;
    } else if (lowestValuePlayer.value === null || totalValue < lowestValuePlayer.value ) {
      lowestValuePlayer.value = totalValue;
      lowestValuePlayer.player = playerId;
    } 
  });

  return mappedPlayers.map((player) => {
    return {
      ...player,
      isBest: highestValuePlayer.player === player.playerId,
      isWorst: lowestValuePlayer.player === player.playerId,
    }
  });
};

const mapChipWithActualChip = (state, chip) => {
  const actualChip = chipSelector(state).find(((actualChip) => actualChip.id === chip.chipId));
            
  return {
    ...actualChip,
    ...chip
  }
};

const potChipsSelector = (state) => {
  const game = gameSelector(state);
  return game?.pot?.map((chip) => mapChipWithActualChip(state, chip));
};
export {participantPlayerSelector, potChipsSelector};