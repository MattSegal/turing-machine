import {types} from 'actions'
import CONST from 'constants'


export const machineReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.FIND_MATCH:      return findMatchingRule(action, state)
    case types.APPLY_MATCH:     return applyMatchingRule(action, state)
    case types.SET_TAPE:        return setTape(action, state)
    case types.RESET_MACHINE:   return resetMachine(action, state)
    default:                    return {...state}
  }
}


const findMatchingRule = (action, state) => {
  const {machine, program, tape} = state
  const {head, match} = machine

  const tapeValue = head < tape.length ? tape[head] : CONST.BLANK
  const ruleIdx = program[match.node].map(e => e.read).indexOf(tapeValue)
  const noMatchFound = ruleIdx === -1
  if (
    noMatchFound ||
    program[match.node][ruleIdx].next === CONST.ACCEPT ||
    program[match.node][ruleIdx].next === CONST.REJECT ||
    program[match.node][ruleIdx].next === CONST.BLANK
  ) {
    // Halt the machine
    return {
      ...state,
      machine: {
        ...machine,
        state: !noMatchFound && program[match.node][ruleIdx].next === CONST.ACCEPT 
          ? CONST.ACCEPT 
          : CONST.REJECT,
        match: {
          node: match.node || null,
          ruleIdx: ruleIdx >= 0 ? ruleIdx : null,
        },
      }
    } 
  } else {
    // Keep running
    return {
      ...state,
      machine: {
        ...machine,
        state: CONST.RUNNING,
        match: {
          node: match.node,
          ruleIdx: ruleIdx,
        },
      }
    } 
  }
}

const applyMatchingRule = (action, state) => {
  const {machine, program, tape} = state
  const {head, match} = machine
  const rule = program[match.node][match.ruleIdx]
 
  const nextHead = head + (
    rule.move === CONST.RIGHT ? 1 : (head === 0 ? 0 : -1)
  )

  return {
    ...state,
    machine: {
      ...machine,
      head: nextHead,
      match: {
        node: rule.next,
        ruleIdx: null,
      },
    },
    tape: tape.slice(0,head)
      .concat(rule.write)
      .concat(tape.slice(head+1))
      .concat(nextHead === tape.length ? [CONST.BLANK] : []),
  }
}

const resetMachine = (action, state) => ({
  ...state,
  machine: {
    ...state.machine,
    head: CONST.HEAD_START,
    match: {
      node: CONST.INIT,
      ruleIdx: null,
    }
  },
})

const setTape = (action, state) => {
  let newTape = state.tape
    .map((current, idx) => idx !== action.idx 
      ? current 
      : (action.val === '' ? CONST.BLANK : action.val)         
    )

  if (newTape[newTape.length-1] !== CONST.BLANK && newTape[newTape.length-1] !== '')
    newTape.push(CONST.BLANK)

  return {
    ...state,
    tape: newTape,
    machine: {
      ...state.machine,
      head: CONST.HEAD_START,
    }
  }
}