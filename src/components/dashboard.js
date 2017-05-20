import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/dashboard.scss'
import CONST from 'constants'
import programs from 'programs'

class Dashboard extends Component
{
  static propTypes = {
    startMachine: PropTypes.func.isRequired,
    loadProgram: PropTypes.func.isRequired, 
    machine : PropTypes.shape({
      state: PropTypes.string,
    }).isRequired,
  }

  getStatus = () => {
    const {machine} = this.props
    switch(machine.state) {
      case CONST.RUNNING:
        return 'RUNNING'
      case CONST.ACCEPT: 
        return 'ACCEPTED'
      case CONST.REJECT: 
        return 'REJECTED'
      default: 
        return 'HALTED'
    }
  }

  render()
  {
    const {startMachine, loadProgram, machine} = this.props
    const button = (text, clickHandler) => 
       <button 
          className={style.button}
          disabled={machine.state === CONST.RUNNING} 
          onClick={clickHandler}
        >{text}</button>

    return (
      <div className={style.dashboardContainer}>
        {button('Start', startMachine)}
        <h4>STATUS: {this.getStatus()}</h4>
        {programs.map((p, idx) => (
          <div key={idx} className={style.savedProgram}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            {button('Load', () => loadProgram(p.program, p.tape))}
          </div>
        ))}
      </div>
    )
  }
}


module.exports = Dashboard