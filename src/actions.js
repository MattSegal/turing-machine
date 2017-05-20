import CONST from 'constants'

const types = {
  FIND_MATCH: 'FIND_MATCH',
  APPLY_MATCH: 'APPLY_MATCH',
  SET_TAPE: 'SET_TAPE',
  RESET_MACHINE: 'RESET_MACHINE',
  UPDATE_PROGRAM: 'UPDATE_PROGRAM',
  LOAD_PROGRAM: 'LOAD_PROGRAM',
}

const loadProgram = (program, tape) => ({
  type: types.LOAD_PROGRAM,
  program: program,
  tape: tape,
})

const updateProgram = (nodeName, ruleIdx, newRule) => ({
  type: types.UPDATE_PROGRAM,
  nodeName: nodeName,
  ruleIdx: ruleIdx,
  newRule: newRule,
})

const startMachine = () => (dispatch, getState) => {
  const intervalTime = 100 // ms
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

module.exports = {
    types,
    startMachine,
    setTape,
    loadProgram,
    updateProgram,
}