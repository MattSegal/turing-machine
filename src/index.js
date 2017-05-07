"use strict"

import style from 'scss/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger  from 'redux-logger'

// Middleware
const loggerMiddleware = createLogger()

const middleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
)

const initialState = {}
const reducer = () => {}
const store  = createStore(reducer, initialState, middleware)

ReactDOM.render(
  <Provider store={store}>
      <div>
        <p>HELLO WORLD!</p>
      </div>
  </Provider>, 
  document.getElementById('react-root')
)
