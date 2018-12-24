import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootAction } from "./store";
import * as actions from "./store/actions";

const ResetButtonWrapper = styled.button`
  padding: 10px;
  border: 1px solid lightseagreen;
  background: lightseagreen;
  color: #fff;
  transition: 0.2s all;
  margin-top: 20px;
  z-index: 999;
  &:hover {
    color: lightseagreen;
    background: #fff;
  }
`;

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      resetBoard: actions.resetBoard
    },
    dispatch
  );

type Props = ReturnType<typeof mapDispatchToProps>;

const ResetButton: React.FunctionComponent<Props> = ({ resetBoard }) => (
  <ResetButtonWrapper onClick={resetBoard}>Reset</ResetButtonWrapper>
);

export default connect(
  null,
  mapDispatchToProps
)(ResetButton);
