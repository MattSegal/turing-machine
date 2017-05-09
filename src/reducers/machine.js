import {types} from 'actions'
import CONST from 'constants'


export const machineReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.RUN_MACHINE:     return run(action, state)
    case types.SET_TAPE:        return setTape(action, state)
    case types.RESET_MACHINE:   return resetMachine(action, state)
    default:                    return {...state}
  }
}

const run = (action, state) => {
  const {machine} = state
  const {running, tape, head, node, graph} = machine

  const tapeValue = head < tape.length
    ? tape[head]
    : CONST.BLANK

  const edges = graph[node]
  const match = edges.filter(e => e.read.toString() === tapeValue.toString()).pop()

  if (!match || match.next === CONST.REJECT || match.next === CONST.ACCEPT) {
      return {
        ...state,
        machine: {
          ...machine,
          running: false,
          match: !match ? CONST.REJECT : match.next,
        }
      }
  }
  
  const nextHead = head + (
    match.move === CONST.RIGHT ? 1 : (head === 0 ? 0 : -1)
  )

  return {
    ...state,
    machine: {
      ...machine,
      running: true,
      match: null,
      tape: tape.slice(0,head)
        .concat(match.write.toString())
        .concat(tape.slice(head+1))
        .concat(nextHead === tape.length ? [CONST.BLANK] : []),
      head: nextHead,
      node: match.next,
    }
  }
}

const resetMachine = (action, state) => ({
    ...state,
    machine: {
      ...state.machine,
      head: CONST.HEAD_START,
      node: CONST.INIT,
    }
})

const setTape = (action, state) => {
  let newTape = state.machine.tape
    .map((current, idx) => idx !== action.idx 
      ? current 
      : (action.val === '' ? CONST.BLANK : action.val)         
    )

  if (newTape[newTape.length-1] !== CONST.BLANK && newTape[newTape.length-1] !== '')
    newTape.push(CONST.BLANK)

  return {
    ...state,
    machine: {
      ...state.machine,
      tape: newTape,
      head: CONST.HEAD_START,
    }
  }
}