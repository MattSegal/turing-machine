import {types} from 'actions'
import CONST from 'constants'


export const programReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.UPDATE_PROGRAM:      return updateProgram(action, state)
    case types.LOAD_PROGRAM:        return loadProgram(action, state)
    case types.LOAD_TAPE:           return loadTape(action, state)
    default:                        return {...state}
  }
}

const loadProgram = (action, state) => ({
    ...state,
    machine: {
      ...state.machine,
      state: CONST.VIRGIN
    },
    program: action.program,
})


const loadTape = (action, state) => ({
    ...state,
    machine: {
      ...state.machine,
      state: CONST.VIRGIN
    },
    tape: action.tape,
})

const updateProgram = (action, state) => {
  const nodeNames = Object.keys(state.program)
  const newProgram = nodeNames.reduce((program, nodeName) => {
    // Update the changed rule
    if (nodeName === action.nodeName) {
      program[nodeName] = state.program[nodeName].map((rule, idx) =>
        idx === action.ruleIdx ? action.newRule : rule
      )
    } else {
      program[nodeName] = state.program[nodeName]
    }
    
    // Ensure that there is always a blank rule for each node
    const lastRule = program[nodeName].slice(-1)[0] 
    if (!isRuleBlank(lastRule)) {
      program[nodeName] = program[nodeName].concat(CONST.BLANK_RULE)
    }
    return program
  }, {})

  // Ensure that there is always a blank node at the end
  const lastNodeName = nodeNames.sort().slice(-1)[0] 
  const allRulesBlank = newProgram[lastNodeName]
    .reduce((bool, rule) => bool && isRuleBlank(rule), true)

  if (!allRulesBlank) {
    newProgram[getNewNodeName(lastNodeName)] = [CONST.BLANK_RULE]
  }

  return {
    ...state,
    program: newProgram,
  }
}

const isRuleBlank = rule => {
  return rule.next === CONST.BLANK && rule.move === CONST.BLANK
}

const getNewNodeName = (lastNodeName) => {
  if (lastNodeName === CONST.NODE_NAMES[CONST.NODE_NAMES.length - 1]) {
    throw new Error("Too many nodes! We ran out of letters!")
  } 
  return CONST.NODE_NAMES[CONST.NODE_NAMES.indexOf(lastNodeName) + 1]
}