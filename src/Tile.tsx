import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { compose, withStateHandlers, withHandlers } from "recompose";
import { State, Player, RootAction } from "./store";
import * as actions from "./store/actions";

const TileWrapper = styled.button<{ withBorder: boolean }>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex: 0 1 auto;
  background: lightsalmon;
  margin-bottom: 10px;
  border: 2px solid ${p => (p.withBorder ? "maroon" : "lightsalmon")};
  &:first-child {
    margin-right: 10px;
  }
  &:last-child {
    margin-left: 10px;
  }
`;

const mapStateToProps = (state: State) => ({
  activePlayer: state.activePlayer,
  board: state.board
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      addFieldToHuman: actions.addFieldToHuman
    },
    dispatch
  );

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface OwnProps {
  fieldOwner: Player;
  fieldIndex: number;
}

type Props = ReduxProps &
  OwnProps & {
    mouseOver: boolean;
    handleMouseOver: React.MouseEventHandler;
    handleMouseOut: React.MouseEventHandler;
    handleClick: React.MouseEventHandler;
  };

const Tile: React.FunctionComponent<Props> = ({
  fieldOwner,
  activePlayer,
  mouseOver,
  handleMouseOver,
  handleMouseOut,
  handleClick
}) => {
  let tileContent = "";
  if (fieldOwner === Player.human) {
    tileContent = "X";
  } else if (fieldOwner === Player.computer) {
    tileContent = "O";
  }
  return (
    <TileWrapper
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleClick}
      withBorder={mouseOver && activePlayer === Player.human}
    >
      {tileContent}
    </TileWrapper>
  );
};

export default compose<Props, OwnProps>(
  withStateHandlers(
    { mouseOver: false },
    {
      handleMouseOver: () => () => ({ mouseOver: true }),
      handleMouseOut: () => () => ({ mouseOver: false })
    }
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers<ReduxProps & OwnProps, { handleClick: React.MouseEventHandler }>(
    {
      handleClick: ({
        activePlayer,
        fieldOwner,
        fieldIndex,
        addFieldToHuman
      }) => () => {
        if (activePlayer !== Player.human) {
          return null;
        }
        if (fieldOwner !== Player.none) {
          return null;
        }
        return addFieldToHuman(fieldIndex);
      }
    }
  )
)(Tile);
