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
    return (
      <div className={style.appContainer}>
        <Dashboard 
          startMachine={this.props.startMachine}
          machine={this.props.machine}
        />

        <div className={style.appContent}>
          <Tape 
            setTape={this.props.setTape} 
            tape={this.props.tape}
            machine={this.props.machine}
          />
          <Program 
            program={this.props.program} 
            machine={this.props.machine}
            updateProgram={this.props.updateProgram}
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
  setTape: (idx, val) => dispatch(Actions.setTape(idx, val)),
  updateProgram: (nodeName, ruleIdx, newRule) => dispatch(Actions.updateProgram(nodeName, ruleIdx, newRule)),
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)