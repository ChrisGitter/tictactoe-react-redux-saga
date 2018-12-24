import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { State } from "./store";
import Tile from "./Tile";

const TileRowWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  background: #fff;
`;

const mapStateToProps = (state: State) => ({
  board: state.board
});

type Props = ReturnType<typeof mapStateToProps> & {
  row: number;
};

const TileRow: React.FunctionComponent<Props> = ({ row, board }) => {
  const keys = "abcdefghi".split("");
  const renderCols = board
    .filter((_, i) => i >= (row - 1) * 3 && i < row * 3)
    .map((player, i, arr) => (
      <Tile
        fieldIndex={(row - 1) * arr.length + i}
        fieldOwner={player}
        key={keys[i]}
      />
    ));
  return <TileRowWrapper>{renderCols}</TileRowWrapper>;
};

export default connect(mapStateToProps)(TileRow);
