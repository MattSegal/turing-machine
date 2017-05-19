import React, {Component} from 'react';
import {connect} from 'react-redux'
import Actions from 'actions'
import Dashboard from 'components/dashboard'
import Tape from 'components/tape'
import Program from 'components/program'
import style from 'scss/app.scss'

class App extends Component
{
  render()
  {
    const {machine, tape, program, startMachine, setTape} = this.props
    return (
      <div className={style.appContainer}>
        <Dashboard 
          startMachine={startMachine}
          machine={machine}
        />
        <div className={style.appContent}>
          <Tape 
            setTape={setTape} 
            tape={tape}
            machine={machine}
          />
          <Program 
            program={program} 
            machine={machine}
          />
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  machine: state.machine,
  tape: state.tape,
  program: state.program,
})

let mapDispatchToProps = (dispatch) => ({
  startMachine: () => dispatch(Actions.startMachine()),
  setTape: (idx, val) => dispatch(Actions.setTape(idx, val))
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)