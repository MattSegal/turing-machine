import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/dashboard.scss'
import CONST from 'constants'
import programs from 'programs'
import FaPlus from 'react-icons/lib/fa/plus'
import FaMinus from 'react-icons/lib/fa/minus'

class Dashboard extends Component
{
  static propTypes = {
    startMachine: PropTypes.func.isRequired,
    loadProgram: PropTypes.func.isRequired, 
    loadTape: PropTypes.func.isRequired, 
    setDelay: PropTypes.func.isRequired, 
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

  handleIncrementDelay = (e) => {
    if (this.props.machine.delay <= 5000) {
      this.props.setDelay(this.props.machine.delay + 50)
    } 
  }

  handleDecrementDelay = (e) => {
    if (this.props.machine.delay >= 50) {
      this.props.setDelay(this.props.machine.delay - 50)
    } 
  }

  render()
  {
    const {startMachine, loadProgram, loadTape, machine} = this.props
    const isRunning = machine.state === CONST.RUNNING
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
        <div className={style.delayWidget}>
          <span>DELAY: {machine.delay}ms</span>
          {!isRunning && <span onClick={this.handleIncrementDelay}><FaPlus /></span>}
          {!isRunning && <span onClick={this.handleDecrementDelay}><FaMinus /></span>}
        </div>
        {programs.map((p, idx) => (
          <div key={idx} className={style.savedProgram}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            {button('Load Program', () => loadProgram(p.program))}
            {button('Load Tape', () => loadTape(p.tape))}
          </div>
        ))}
      </div>
    )
  }
}


module.exports = Dashboard