import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/dashboard.scss'
import CONST from 'constants'


class Dashboard extends Component
{
  static propTypes = {
    startMachine: PropTypes.func, 
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
        return 'ACCEPT'
      case CONST.REJECT: 
        return 'REJECT'
      default: 
        return ''
    }
  }

  render()
  {
    const {startMachine, running} = this.props
    return (
      <div className={style.dashboardContainer}>
        <button disabled={running} onClick={startMachine}>Start</button>
        <h3 className={style.status}>{this.getStatus()}</h3>
      </div>
    )
  }
}


module.exports = Dashboard