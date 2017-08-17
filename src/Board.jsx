import React from 'react';
import styled from 'styled-components';

import TileRow from './TileRow';
import ResetButton from './ResetButton';
import GameEndOverlay from './GameEndOverlay';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  & > div:last-child > div {
    margin-bottom: 0 !important;
  }
`;

const Board = () => {
  const keys = 'abcdefg'.split('');
  const renderTiles = Array.from(Array(3)).map((_, i) => (
    <TileRow
      row={i + 1}
      key={keys[i]}
    />
  ));
  return (
    <AppWrapper>
      <GameEndOverlay />
      <BoardWrapper>
        {renderTiles}
      </BoardWrapper>
      <ResetButton />
    </AppWrapper>
  );
};

export default Board;
