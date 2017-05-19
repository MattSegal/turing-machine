import {pipe} from 'utilities'
import {machineReducer} from './machine'
import {programReducer} from './program'

const reducer = (state,action) =>
    pipe(
        machineReducer(action),
        programReducer(action),
    )(state)

module.exports = reducer