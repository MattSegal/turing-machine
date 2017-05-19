import {types} from 'actions'
import CONST from 'constants'


export const programReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.UPDATE_PROGRAM:      return updateProgram(action, state)
    default:                        return {...state}
  }
}

const updateProgram = (action, state) => ({
  ...state,
  program: {
    ...state.program,
    [action.nodeName]: action.rules,
  },
})