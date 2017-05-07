const types = {
  RUN_MACHINE: 'RUN_MACHINE',
}

const startMachine = () => (dispatch, getState) => {
  dispatch({type: types.RUN_MACHINE})  
  const intervalTime = 400 // ms
  const intervalId = setInterval(() => {
    const {machine} = getState()
    if (machine.running) {
      dispatch({type: types.RUN_MACHINE})
    } else {
      clearInterval(intervalId)
    }
  }, intervalTime)
}




module.exports = {
    types,
    startMachine,
}