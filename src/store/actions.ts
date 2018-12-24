import { createAction } from "typesafe-actions";
import { Player } from "./index";

export const setActivePlayer = createAction(
  "SET_PLAYER",
  resolve => (player: Player.computer | Player.human) => resolve(player)
);

export const addFieldToHuman = createAction(
  "ADD_FIELD_TO_HUMAN",
  resolve => (boardIndex: number) => resolve(boardIndex)
);

export const addFieldToComputer = createAction(
  "ADD_FIELD_TO_COMPUTER",
  resolve => (boardIndex: number) => resolve(boardIndex)
);

export const resetBoard = createAction("RESET_BOARD");

export const setWinner = createAction(
  "SET_WINNER",
  resolve => (winner: Player.computer | Player.human) => resolve(winner)
);
