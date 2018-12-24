import { getType } from "typesafe-actions";
import { SagaIterator } from "redux-saga";
import { put, take, select, call } from "redux-saga/effects";
import {
  addFieldToComputer,
  addFieldToHuman,
  setActivePlayer,
  setWinner
} from "../store/actions";
import { State, Player } from "../store/index";

function* rootSaga(): SagaIterator {
  while (true) {
    yield take(getType(addFieldToHuman));
    if (yield call(checkConditions)) {
      continue;
    }
    yield put(setActivePlayer(Player.computer));

    yield call(computerExecutesTurn);
    yield call(checkConditions);
    yield put(setActivePlayer(Player.human));
  }
}

const selectBoard = (state: State) => state.board;

function* checkConditions(): SagaIterator {
  const currentBoard: ReturnType<typeof selectBoard> = yield select(
    selectBoard
  );
  const winner: Player = yield call(checkIfWon, currentBoard);
  const boardFull =
    currentBoard.filter(field => field === Player.none).length === 0;
  return winner !== Player.none || boardFull;
}

function* checkIfWon(board: State["board"]): SagaIterator {
  if (yield call(hasThreeInARow, board, Player.human)) {
    yield put(setWinner(Player.human));
    return Player.human;
  }
  if (yield call(hasThreeInARow, board, Player.computer)) {
    yield put(setWinner(Player.computer));
    return Player.computer;
  }
  return Player.none;
}

function* hasThreeInARow(board: State["board"], player: Player): SagaIterator {
  return (
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ].filter(
      ([indexA, indexB, indexC]) =>
        board[indexA] === player &&
        board[indexB] === player &&
        board[indexC] === player
    ).length > 0
  );
}

function* computerExecutesTurn(): SagaIterator {
  const board: ReturnType<typeof selectBoard> = yield select(selectBoard);
  const freeFields = board
    .map<[Player, number]>((player, index) => [player, index])
    .filter(([player]) => player === Player.none);
  const rndIndex = Math.floor(Math.random() * freeFields.length);
  yield put(addFieldToComputer(freeFields[rndIndex][1]));
}

// function* computerExecutesSmart(): SagaIterator {
//   let bestMove = -2;
//   const board = yield select(state => state.board);
//   // no field taken => take middle field
//   if (board.filter(field => field === 0).length === board.lengt) {
//     yield put(addFieldToComputer(4));
//     return;
//   }
//   board.forEach(field => {});
// }

export default rootSaga;
