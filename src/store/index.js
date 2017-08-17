import {
  ADD_FIELD_TO_PLAYER,
  ADD_FIELD_TO_COMPUTER,
  SET_PLAYERS_TURN,
  RESET_BOARD,
  END_GAME,
  PLAYER_WINS,
  COMPUTER_WINS,
} from './actions';
import {
  addFieldToPlayer,
  addFieldToComputer,
  setPlayersTurn,
  resetBoard,
  endGame,
  playerWins,
  computerWins,
} from './reducers';

const DEFAULT_STATE = {
  playersTurn: true,
  board: [
    2, 2, 1,
    2, 2, 0,
    1, 0, 2,
  ],
  gameEnd: false,
  winner: 0,
};

const reducers = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_FIELD_TO_PLAYER:
      return addFieldToPlayer(state, action);
    case ADD_FIELD_TO_COMPUTER:
      return addFieldToComputer(state, action);
    case SET_PLAYERS_TURN:
      return setPlayersTurn(state, action);
    case RESET_BOARD:
      return resetBoard(state);
    case END_GAME:
      return endGame(state);
    case PLAYER_WINS:
      return playerWins(state);
    case COMPUTER_WINS:
      return computerWins(state);
    default:
      return state;
  }
};

export default reducers;
