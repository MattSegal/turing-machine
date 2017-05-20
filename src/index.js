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
import programs from 'programs'

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
  tape: programs[0].tape,
  program: programs[0].program
}
const store  = createStore(reducer, initialState, middleware)

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>, 
  document.getElementById('react-root')
)
