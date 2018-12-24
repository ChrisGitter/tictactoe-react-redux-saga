import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { State, Player } from "./store";

const getMessage = (player: Player) => {
  switch (player) {
    case Player.human:
      return "You win!";
    case Player.computer:
      return "You loose...";
    default:
      return "Oh, it's a tie!";
  }
};

const GameEndOverlayWrapper = styled.div`
  visibility: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 998;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const GameEndOverlaybox = styled.div`
  display: inline;
  z-index: 999;
  flex: 0 0 auto;
  padding: 10px;
  color: #fff;
  background: #000;
  border: 2px solid #fff;
  font-size: 2rem;
  animation: colorchange 2s;
  animation-iteration-count: infinite;
  @keyframes colorchange {
    0% {
      background: red;
      border-color: green;
    }
    25% {
      background: yellow;
      border-color: blue;
    }
    50% {
      background: blue;
      border-color: red;
    }
    75% {
      background: green;
      border-color: yellow;
    }
    100% {
      background: red;
      border-color: green;
    }
  }
`;

const renderOverlay = (text: string): JSX.Element => (
  <GameEndOverlayWrapper>
    <GameEndOverlaybox>{text}!</GameEndOverlaybox>
  </GameEndOverlayWrapper>
);

const mapStateToProps = (state: State) => ({
  winner: state.winner,
  board: state.board
});

type Props = ReturnType<typeof mapStateToProps>;

const GameEndOverlay: React.FunctionComponent<Props> = ({ board, winner }) => {
  const gameOver =
    winner !== Player.none ||
    board.filter(field => field === Player.none).length === 0;
  return gameOver ? renderOverlay(getMessage(winner)) : null;
};

export default connect(mapStateToProps)(GameEndOverlay);
