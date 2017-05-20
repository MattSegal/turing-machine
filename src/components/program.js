import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/program.scss'
import CONST from 'constants'

class Program extends Component
{
  static propTypes = {
    program: PropTypes.object.isRequired, 
    machine: PropTypes.shape({
      match: PropTypes.PropTypes.shape({
        node: PropTypes.string,
        ruleIdx: PropTypes.number,
      }).isRequired,
    }).isRequired,
    updateProgram: PropTypes.func,
  }

  tagActiveNode = (nodeName, className) => {
    const isActiveNode = this.props.machine.match.node === nodeName
    return `${className} ${isActiveNode ? style.active : ''}`
  }

  tagActiveRule = (ruleIdx, nodeName, className) => {
    const isActiveNode = this.props.machine.match.node === nodeName
    const isActiveRule = this.props.machine.match.ruleIdx === ruleIdx
    return `${className} ${isActiveNode && isActiveRule ? style.active : ''}`
  }

  handleSelect = (operation, ruleIdx, nodeName) => (e) => {
    let newRule
    switch(operation) {
      case 'READ':
        newRule = {
          ...(this.props.program[nodeName][ruleIdx]),
          read: e.target.value
        }
        break
      case 'WRITE':
        newRule = {
          ...(this.props.program[nodeName][ruleIdx]),
          write: e.target.value
        }
        break
      case 'MOVE':
        newRule = {
          ...(this.props.program[nodeName][ruleIdx]),
          move: e.target.value
        }
        break
      case 'NEXT':
        newRule = {
          ...(this.props.program[nodeName][ruleIdx]),
          next: e.target.value
        }
        break
      default:
        return
    }
    this.props.updateProgram(nodeName, ruleIdx, newRule)
  }

  selector = (nodeName, ruleIdx, fieldName, value, options) => (
     <select
      onChange={this.handleSelect(fieldName, ruleIdx, nodeName)}
      value={value}
    >
      {options.map((chr, idx) => <option key={idx} value={chr}>{chr}</option>)}
    </select>
  )

  render()
  {
    const {program} = this.props
    return (
      <div>
        <div className={style.node}>
            <div className={style.topHeader}>Node</div>
            <div className={style.nodeRules}>
              <div className={style.rule}>
                <span className={style.header}>Read</span>
                <span className={style.header}>Write</span>
                <span className={style.header}>Move</span>
                <span className={style.header}>Next</span>
              </div>
            </div>
          </div>
        {Object.keys(program).map(nodeName => (
          <div key={nodeName} className={this.tagActiveNode(nodeName, style.node)}>
            <div className={style.nodeHeader}>{nodeName}</div>
            <div className={style.nodeRules}>
              {program[nodeName].map((rule, idx) => (
                <div key={idx} className={this.tagActiveRule(idx, nodeName, style.rule)}>
                  <span>
                    {this.selector(nodeName, idx, 'READ', rule.read, 
                      ["0", "1", "#", "!", "$", "&", CONST.BLANK]
                    )}
                  </span>
                  <span>
                    {this.selector(nodeName, idx, 'WRITE', rule.write, 
                      ["0", "1", "!", "$", "&", CONST.BLANK]
                    )}
                  </span>
                  <span>  
                    {this.selector(nodeName, idx, 'MOVE', rule.move, 
                      ["RIGHT", "LEFT", CONST.BLANK]
                    )}                  
                  </span>
                  <span>    
                    {this.selector(nodeName, idx, 'NEXT', rule.next, 
                      Object.keys(program).concat(['ACCEPT', CONST.BLANK])
                    )}                
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}


module.exports = Program