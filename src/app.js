import React, {Component} from 'react';
import {connect} from 'react-redux'
import Actions from 'actions'
import Sidebar from 'components/sidebar'
import Tape from 'components/tape'
import style from 'scss/app.scss'

class App extends Component
{
  render()
  {
    const {machine, startMachine, setTape} = this.props
    return (
      <div className={style.appContainer}>
        <Sidebar 
          startMachine={startMachine}
          running={machine.running}
        />
        <div className={style.appContent}>
        <Tape 
          setTape={setTape} 
          {...machine} 
        />
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