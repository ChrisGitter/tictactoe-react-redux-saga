import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
/* eslint-disable no-confusing-arrow */
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose, withStateHandlers, withHandlers } from 'recompose';

import { addFieldToPlayer as addFieldToPlayerAction } from './store/actionCreators';

const TileWrapper = styled.button`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex: 0 1 auto;
  background: lightsalmon;
  margin-bottom: 10px;
  border: 2px solid ${p => p.withBorder ? 'maroon' : 'lightsalmon'};
  &:first-child {
    margin-right: 10px;
  }
  &:last-child {
    margin-left: 10px;
  }
`;

const Tile = ({
  value,
  playersTurn,
  mouseover,
  handleMouseOver,
  handleMouseOut,
  handleClick,
}) => {
  let tileContent = '';
  if (value === 1) {
    tileContent = 'X';
  } else if (value === 2) {
    tileContent = 'O';
  }
  return (
    <TileWrapper
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleClick}
      withBorder={mouseover && playersTurn}
    >
      {tileContent}
    </TileWrapper>
  );
};

Tile.propTypes = {
  playersTurn: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  mouseover: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default compose(
  withStateHandlers(
    { mouseover: false },
    {
      handleMouseOver: () => () => ({ mouseover: true }),
      handleMouseOut: () => () => ({ mouseover: false }),
    },
  ),
  connect(
    state => ({
      playersTurn: state.playersTurn,
      board: state.board,
    }),
    dispatch => bindActionCreators({
      addFieldToPlayer: addFieldToPlayerAction,
    }, dispatch),
  ),
  withHandlers({
    handleClick:
    ({ playersTurn, board, boardKey, addFieldToPlayer }) => () => {
      if (!playersTurn) {
        return null;
      }
      if (board[boardKey] !== 0) {
        return null;
      }
      return addFieldToPlayer(boardKey);
    },
  }),
)(Tile);
