import update from 'immutability-helper';

export const setPlayersTurn = (state, { payload }) =>
  update(state, { playersTurn: { $set: payload } });
export const addFieldToPlayer = (state, { payload }) =>
  update(state, { board: { [payload]: { $set: 1 } } });
export const addFieldToComputer = (state, { payload }) =>
  update(state, { board: { [payload]: { $set: 2 } } });
export const resetBoard = state => update(state, {
  playersTurn: { $set: true },
  board: { $apply: x => x.map(() => 0) },
  gameEnd: { $set: false },
  winner: { $set: 0 },
});
export const endGame = state =>
  update(state, { gameEnd: { $set: true } });
export const playerWins = state =>
  update(state, { winner: { $set: 1 } });
export const computerWins = state =>
  update(state, { winner: { $set: 2 } });
