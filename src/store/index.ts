import update from "immutability-helper";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";

export enum Player {
  human = "human",
  computer = "computer",
  none = "none"
}

export interface State {
  activePlayer: Player.human | Player.computer;
  board: Player[];
  winner: Player;
}

export type RootAction = ActionType<typeof actions>;

const getEmptyBoard = (): State["board"] => new Array(9).fill(Player.none);

const DEFAULT_STATE: State = {
  activePlayer: Player.human,
  board: getEmptyBoard(),
  winner: Player.none
};

const reducers = (state: State = DEFAULT_STATE, action: RootAction): State => {
  switch (action.type) {
    case getType(actions.addFieldToComputer):
      return update(state, {
        board: { [action.payload]: { $set: Player.computer } }
      });
    case getType(actions.addFieldToHuman):
      return update(state, {
        board: { [action.payload]: { $set: Player.human } }
      });
    case getType(actions.resetBoard):
      return update(state, {
        board: { $set: getEmptyBoard() },
        winner: { $set: Player.none }
      });
    case getType(actions.setActivePlayer):
      return update(state, { activePlayer: { $set: action.payload } });
    case getType(actions.setWinner):
      return update(state, { winner: { $set: action.payload } });
    default:
      return state;
  }
};

export default reducers;
