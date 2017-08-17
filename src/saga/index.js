import { put, take, select, call, fork } from 'redux-saga/effects';

import {
  ADD_FIELD_TO_PLAYER,
  ADD_FIELD_TO_COMPUTER,
} from '../store/actions';
import {
  playerWins,
  computerWins,
  endGame,
  endPlayersTurn,
  endComputersTurn,
  addFieldToComputer,
} from '../store/actionCreators';

function* rootSaga() {
  while (true) {
    const action = yield take([ADD_FIELD_TO_PLAYER, ADD_FIELD_TO_COMPUTER]);
    const end = yield call(checkConditions);
    if (end) {
      yield put(endGame());
      continue;
    }
    if (action.type === ADD_FIELD_TO_PLAYER) {
      yield put(endPlayersTurn());
      yield fork(computerExecutesTurn);
    } else {
      yield put(endComputersTurn());
    }
  }
}

function* checkConditions() {
  const currentBoard = yield select(state => state.board);
  const winner = yield call(checkIfWon, currentBoard);
  const boardFull = currentBoard.filter(field => field === 0).length === 0;
  if (winner > 0 || boardFull) {
    return true;
  }
  return false;
}

function* checkIfWon(board) {
  let winner = 0;
  [1,2].forEach(player => {
    [0,1].forEach(isHorizontal => {
      [1,2,3].forEach(row => {
        if (winner) {
          return;
        }
        let value = 0;
        if (isHorizontal) {
          value = board
            .slice(3 * (row - 1), 3 * row);
        } else {
          value = board
            .filter((field, index) => {
              const col = [0,3,6].map(colIndex => colIndex + (row - 1));
              return col.includes(index);
            });
        }
        value = value
          .filter(field => player === field)
          .map(field => 1)
          .reduce((a, b) => a + b, 0);
        if (value === 3) {
          winner = player;
        }
      });
    });
  });

  if (winner === 1) {
    yield put(playerWins());
  } else if (winner === 2) {
    yield put(computerWins());
  }
  return winner;
}

function* computerExecutesTurn() {
  const board = yield select(state => state.board);
  const keys = Array
    .from(board.keys())
    .filter(key => board[key] === 0);
  const rndIndex = Math.floor(Math.random() * keys.length);
  yield put(addFieldToComputer(keys[rndIndex]));
}

function* computerExecutesSmart() {
  let bestMove = -2;
  const board = yield select(state => state.board);
  // no field taken => take middle field
  if (board.filter(field => field === 0).length === board.lengt) {
    yield put(addFieldToComputer(4));
    return;
  }
  board.forEach(field => {
    
  })
}
  
export default rootSaga;
