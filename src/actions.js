import CONST from 'constants'

const types = {
  RUN_MACHINE: 'RUN_MACHINE',
  SET_TAPE: 'SET_TAPE',
  RESET_MACHINE: 'RESET_MACHINE',
}

const startMachine = () => (dispatch, getState) => {
  dispatch({type: types.RESET_MACHINE}) 
  dispatch({type: types.RUN_MACHINE})
  const intervalTime = 300 // ms
  const intervalId = setInterval(() => {
    const {machine} = getState()
    if (machine.running) {
      dispatch({type: types.RUN_MACHINE})
    } else {
      clearInterval(intervalId)
      dispatch({type: types.RESET_MACHINE}) 
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
}