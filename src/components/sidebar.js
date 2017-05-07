import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/sidebar.scss'
import CONST from 'constants'

class Sidebar extends Component
{
  static propTypes = {
    startMachine: PropTypes.func, 
    running: PropTypes.bool,
    match: PropTypes.string,
  }

  getStatus = () => {
    if (this.props.running) 
      return 'running'
    switch(this.props.match) {
      case CONST.ACCEPT: 
        return 'accepted'
      case CONST.REJECT: 
        return 'rejected'
      default: 
        return 'not run'
    }
  }

  render()
  {
    const {startMachine, running} = this.props
    return (
      <div className={style.sidebarSpacer}>
        <div className={style.sidebarContainer}>
          <button disabled={running} onClick={startMachine}>Start</button>
          <p>
            Status: {this.getStatus()}
          </p>
        </div>
      </div>
      
    )
  }
}


module.exports = Sidebar