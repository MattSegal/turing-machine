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
    const {machine, startMachine, setTape} = this.props
    return (
      <div className={style.appContainer}>
        <Dashboard 
          startMachine={startMachine}
          running={machine.running}
          match={machine.match}
        />
        <div className={style.appContent}>
          <Tape 
            setTape={setTape} 
            {...machine} 
          />
          <Program graph={machine.graph} />
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  machine: state.machine,
})

let mapDispatchToProps = (dispatch) => ({
  startMachine: () => dispatch(Actions.startMachine()),
  setTape: (idx, val) => dispatch(Actions.setTape(idx, val))
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)