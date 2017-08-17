import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import reducers from './store';
import Board from './Board';

const sagaMiddleware = createSagaMiddleware(rootSaga);
// eslint-disable no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-enable no-underscore-dangle
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

const App = () => (
  <Provider store={store}>
    <Board />
  </Provider>
);

export default App;