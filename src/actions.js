import CONST from 'constants'

const types = {
  FIND_MATCH: 'FIND_MATCH',
  APPLY_MATCH: 'APPLY_MATCH',
  SET_TAPE: 'SET_TAPE',
  RESET_MACHINE: 'RESET_MACHINE',
  SET_DELAY: 'SET_DELAY',
  UPDATE_PROGRAM: 'UPDATE_PROGRAM',
  LOAD_PROGRAM: 'LOAD_PROGRAM',
  LOAD_TAPE: 'LOAD_TAPE',
}

const loadProgram = (program) => ({
  type: types.LOAD_PROGRAM,
  program: program,
})

const loadTape = (tape) => ({
  type: types.LOAD_TAPE,
  tape: tape,
})

const updateProgram = (nodeName, ruleIdx, newRule) => ({
  type: types.UPDATE_PROGRAM,
  nodeName: nodeName,
  ruleIdx: ruleIdx,
  newRule: newRule,
})

const startMachine = () => (dispatch, getState) => {
  const intervalTime = getState().machine.delay
  let intervalId

  dispatch({type: types.RESET_MACHINE}) 
  dispatch({type: types.FIND_MATCH})

  intervalId = setInterval(() => {
    const {machine} = getState()
    if (machine.state === CONST.RUNNING) {
      dispatch({type: types.APPLY_MATCH})
      dispatch({type: types.FIND_MATCH})
    } else {
      clearInterval(intervalId)
      setTimeout(() => dispatch({type: types.RESET_MACHINE}) , intervalTime)
    }
  }, intervalTime)
}

const setTape = (idx,val) => ({
  type: types.SET_TAPE,
  idx,
  val
})

const setDelay = (delayMs) => ({
  type: types.SET_DELAY,
  delayMs,
})

module.exports = {
    types,
    startMachine,
    setTape,
    setDelay,
    loadProgram,
    loadTape,
    updateProgram,
}