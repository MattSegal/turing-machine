import {pipe} from 'utilities'
import {machineReducer} from './machine'

const reducer = (state,action) =>
    pipe(
        machineReducer(action),
    )(state)

module.exports = reducer