import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DropTarget} from 'react-dnd'
import style from 'scss/program.scss'

import Node from 'components/node'

class DropBox extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      boxes: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
      },
    }
  }

  moveBox(id, left, top) {
    this.setState({
      boxes: Object.keys(this.state.boxes).reduce((acc, key) => {
        if (id === key) {
          acc[key] = {...(this.state.boxes[key]), top: top, left: left}
        } else {
          acc[key] = this.state.boxes[key]
        }
        return acc
      },{})
    });
  }

  render() {
    const {connectDropTarget} = this.props
    const {boxes} = this.state

    return connectDropTarget(
      <div className={style.programContainer}>
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          return (
            <Node
              key={key}
              id={key}
              left={left}
              top={top}
            >
              {title}
            </Node>
          );
        })}
      </div>,
    );
  }

}

const contract = {
   drop: (props, monitor, component) => {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.moveBox(item.id, left, top);
  },
}

const collect = (connect) => ({
    connectDropTarget: connect.dropTarget(),
})


module.exports = DropTarget('NODE', contract, collect)(DropBox)
