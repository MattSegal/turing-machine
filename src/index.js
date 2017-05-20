"use strict"

import style from 'scss/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger  from 'redux-logger'
import reducer from 'reducers'
import App from 'app'
import CONST from 'constants'

// Middleware
const loggerMiddleware = createLogger()

const middleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
)

const initialState = {
  machine: {
    state: CONST.VIRGIN,
    head: CONST.HEAD_START,
    match: {
      node: CONST.INIT,
      ruleIdx: null,
    }
  },
  tape: [CONST.START,'1','0','1','1','0','0',CONST.BLANK],
  program: {
    A: [
      {
        read: '1',
        next: CONST.INIT,
        write: '1',
        move: CONST.RIGHT
      },
      {
        read: '0',
        next: CONST.INIT,
        write: '1',
        move: CONST.LEFT
      },
      {
        read: CONST.BLANK,
        next: 'B',
        write: CONST.BLANK,
        move: CONST.LEFT
      },
      CONST.BLANK_RULE
    ],
    B: [
      {
        read: '1',
        next: 'B',
        write: '1',
        move: CONST.LEFT
      },
      {
        read: CONST.START,
        next: CONST.ACCEPT,
        write: CONST.START,
      },
      CONST.BLANK_RULE
    ],
    C: [CONST.BLANK_RULE]
  }
}
const store  = createStore(reducer, initialState, middleware)

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>, 
  document.getElementById('react-root')
)
