import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/sidebar.scss'

class Sidebar extends Component
{
  static propTypes = {
    startMachine: PropTypes.func, 
    running: PropTypes.bool,
  }

  render()
  {
    const {startMachine, running} = this.props
    return (
      <div className={style.sidebarContainer}>
        <button disabled={running} onClick={startMachine}>Start</button>
      </div>
    )
  }
}


module.exports = Sidebar