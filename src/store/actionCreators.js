import {
  SET_PLAYERS_TURN,
  ADD_FIELD_TO_PLAYER,
  ADD_FIELD_TO_COMPUTER,
  RESET_BOARD,
  END_GAME,
  COMPUTER_WINS,
  PLAYER_WINS,
} from './actions';

export const endPlayersTurn = () => ({
  type: SET_PLAYERS_TURN,
  payload: false,
});

export const endComputersTurn = () => ({
  type: SET_PLAYERS_TURN,
  payload: true,
});

export const addFieldToPlayer = id => ({
  type: ADD_FIELD_TO_PLAYER,
  payload: id,
});

export const addFieldToComputer = id => ({
  type: ADD_FIELD_TO_COMPUTER,
  payload: id,
});

export const resetBoard = () => ({
  type: RESET_BOARD,
});

export const playerWins = () => ({
  type: PLAYER_WINS,
});

export const computerWins = () => ({
  type: COMPUTER_WINS,
});

export const endGame = () => ({
  type: END_GAME,
});
