import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const GameEndOverlayWrapper = styled.div`
  visibility: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 998;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5)
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
  @keyframes colorchange
    {
      0%   {
        background: red;
        border-color: green;
      }
      25%  {
        background: yellow;
        border-color: blue;
      }
      50%  {
        background: blue;
        border-color: red;
      }
      75%  {
        background: green;
        border-color: yellow;
      }
      100% {
        background: red;
        border-color: green;
      }
    }
`;

const renderOverlay = text => (
  <GameEndOverlayWrapper>
    <GameEndOverlaybox>
      {text}!
    </GameEndOverlaybox>
  </GameEndOverlayWrapper>
);

const GameEndOverlay = ({ gameEnd, winner }) => {
  let text = 'Oh, it\'s a tie!';
  if (winner === 1) {
    text = 'You win!';
  } else if (winner === 2) {
    text = 'You loose!';
  }
  return gameEnd ? renderOverlay(text) : null;
};

export default connect(
  state => ({
    gameEnd: state.gameEnd,
    winner: state.winner,
  }),
)(GameEndOverlay);

