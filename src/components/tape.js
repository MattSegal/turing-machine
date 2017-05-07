import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/tape.scss'

class Tape extends Component
{
  static propTypes = {
    tape: PropTypes.array, 
    head: PropTypes.number, 
  }

  render()
  {
    const {tape, head, graph} = this.props
    const entryClass = (i,h) => `${style.entry} ${i === h && style.active}`
    return (
      <div>
        {tape.map((entry, idx) => 
          <span key={idx} className={entryClass(idx,head)}>
            {entry}
          </span>
        )}
      </div>
    )
  }
}


module.exports = Tape