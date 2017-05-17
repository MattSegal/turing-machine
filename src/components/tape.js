import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CONST from 'constants'
import style from 'scss/tape.scss'
import FaStarO from 'react-icons/lib/fa/star-o'
import MdArrowDropUp from 'react-icons/lib/md/arrow-drop-up'

class Tape extends Component
{
  static propTypes = {
    setTape: PropTypes.func,
    tape: PropTypes.array, 
    head: PropTypes.number,
  }

  handleKeyDown = (idx) => (e) => {
    if (e.key.length === 1)
      this.props.setTape(idx, e.key)
    if (e.key === 'Backspace')
      this.props.setTape(idx, CONST.BLANK)
  }

  handleFocus = (e) => {
    e.target.focus()
  }

  

  render()
  {
    const {tape, head, graph} = this.props
    return (
      <div>
        <div className={style.tapeContainer}>
          {tape.map((entry,  idx) => ( idx === 0
            ? <span key={idx} className={style.entryContainer}>
                <input readOnly className={style.start} value={CONST.START} />
                {head === idx && <MdArrowDropUp className={style.head} />}
              </span>
            : <span key={idx} className={style.entryContainer}>
                <input
                  type="text"
                  onChange={()=>{}}
                  maxLength="1"
                  className={style.entry}
                  onKeyDown={this.handleKeyDown(idx)}
                  onFocus={this.handleFocus}
                  value={tape[idx]}
                />
                {head === idx && <MdArrowDropUp className={style.head} />}
              </span>
          ))}
        </div>
      </div>
    )
  }
}


module.exports = Tape