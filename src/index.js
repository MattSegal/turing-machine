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
    running: false,
    match: null,
    tape: [CONST.START,1,0,1,1,0,0],
    head: 1,
    node: 'a',
    graph: {
      a: [
        {
          read: 1,
          next: 'a',
          write: 1,
          move: CONST.RIGHT
        },
        {
          read: 0,
          next: 'a',
          write: 1,
          move: CONST.LEFT
        },
        {
          read: CONST.BLANK,
          next: 'b',
          write: CONST.BLANK,
          move: CONST.LEFT
        },
      ],
      b: [
        {
          read: 1,
          next: 'b',
          write: 1,
          move: CONST.LEFT
        },
        {
          read: CONST.START,
          next: CONST.ACCEPT,
          write: CONST.START,
        }
      ]
    }
  }
}
const store  = createStore(reducer, initialState, middleware)

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>, 
  document.getElementById('react-root')
)
