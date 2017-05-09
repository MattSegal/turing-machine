import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

import DropBox from 'components/dropbox'

class Program extends Component
{
  render()
  {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <DropBox />
      </DragDropContextProvider>
    )
  }
}


module.exports = Program