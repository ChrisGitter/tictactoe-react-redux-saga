import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tile from './Tile';

const TileRowWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  background: #fff;
`;

const TileRow = ({ row, board }) => {
  const keys = 'abcdefghi'.split('');
  const renderCols = board
    .filter((e, i) => (i >= (row - 1) * 3) && (i < row * 3))
    .map((field, i, arr) => (
      <Tile
        boardKey={((row - 1) * arr.length) + i}
        value={field}
        key={keys[i]}
      />
    ));
  return (
    <TileRowWrapper>
      {renderCols}
    </TileRowWrapper>
  );
};

TileRow.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  row: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    board: state.board,
  }),
)(TileRow);
