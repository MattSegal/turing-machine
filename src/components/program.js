import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CONST from 'constants'
import style from 'scss/program.scss'

import {DragDropContextProvider, DropTarget, DragSource} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

const nodeStyle = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

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
      <div style={{ ...nodeStyle, left, top }}>
        {children}
      </div>
    )
  }
}

const nodeContract = {
  beginDrag: (props) => {
    const { id, left, top } = props
    return { id, left, top }
  }
}

const collectNode = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

const ConnectedNode = DragSource('NODE', nodeContract, collectNode)(Node)


// ======================

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
            <ConnectedNode
              key={key}
              id={key}
              left={left}
              top={top}
            >
              {title}
            </ConnectedNode>
          );
        })}
      </div>,
    );
  }

}

const boxTarget = {
   drop: (props, monitor, component) => {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.moveBox(item.id, left, top);
  },
}

const collectBox = (connect) => ({
    connectDropTarget: connect.dropTarget(),
})


const ConnectedDropBox = DropTarget('NODE', boxTarget, collectBox)(DropBox)

class Program extends Component
{
  render()
  {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <ConnectedDropBox />
      </DragDropContextProvider>
    )
  }
}


module.exports = Program