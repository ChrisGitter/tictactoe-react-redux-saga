import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { resetBoard as resetBoardAction } from './store/actionCreators';

const ResetButtonWrapper = styled.button`
  padding: 10px;
  border: 1px solid lightseagreen;
  background: lightseagreen;
  color: #fff;
  transition: .2s all;
  margin-top: 20px;
  z-index: 999;
  &:hover {
    color: lightseagreen;
    background: #fff;
  }
`;

const ResetButton = ({ resetBoard }) => (
  <ResetButtonWrapper onClick={resetBoard}>
    Reset
  </ResetButtonWrapper>
);

ResetButton.propTypes = {
  resetBoard: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => bindActionCreators(
    {
      resetBoard: resetBoardAction,
    },
    dispatch,
  ),
)(ResetButton);
