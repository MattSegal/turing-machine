import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import style from 'scss/program.scss'


class Node extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    children: PropTypes.node,
  }

  render() 
  {
    const {left, top, connectDragSource, isDragging, children } = this.props
    
    if (isDragging) {
      return null;
    }

    return connectDragSource(
      <div className={style.node} style={{left, top }}>
        {children}
      </div>
    )
  }
}

const contract = {
  beginDrag: (props) => {
    const { id, left, top } = props
    return { id, left, top }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

module.exports  = DragSource('NODE', contract, collect)(Node)