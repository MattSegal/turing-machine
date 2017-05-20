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

const updateProgram = (action, state) => {
  
  // Ensure that there is always a blank node
  const nodeNames = Object.keys(state.program)
  const lastNodeName = Object.keys(state.program).sort().pop()
  const newNodeName = getNewNodeName(lastNodeName)

  return {
    ...state,
    program: nodeNames.reduce((program, nodeName) => {

      // Update the changed rule
      if (nodeName === action.nodeName) {
        program[nodeName] = state.program[nodeName].map((rule, idx) =>
          idx === action.ruleIdx ? action.newRule : rule
        )
      } else {
        program[nodeName] = state.program[nodeName]
      }
      
      
      // Ensure that there is always a blank rule for each node
      const lastRule = program[nodeName][program[nodeName].length - 1]
      if (lastRule.next !== CONST.BLANK && lastRule.move !== CONST.BLANK) {
        program[nodeName] = program[nodeName].concat(CONST.BLANK_RULE)
      }

      return program
    }, {}),
  }
}

const getNewNodeName = (lastNodeName) => {
  if (lastNodeName === CONST.NODE_NAMES[CONST.NODE_NAMES.length - 1]) {
    throw new Error("Too many nodes! We ran out of letters!")
  } 
  return CONST.NODE_NAMES[CONST.NODE_NAMES.indexOf(lastNodeName) + 1]
}