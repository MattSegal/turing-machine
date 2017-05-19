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
    console.log(newRule)

    const newRules = this.props.program[nodeName].map((rule, idx) =>
      idx === ruleIdx ? newRule : rule
    )
    this.props.updateProgram(nodeName, newRules)
  }

  render()
  {
    const {program} = this.props
    return (
      <div>
        <h1>Program</h1>
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
                    <select
                      onChange={this.handleSelect('READ', idx, nodeName)}
                      defaultValue={rule.read}
                    >
                      <option value="0">0</option> 
                      <option value="1">1</option>
                      <option value="#">#</option>
                      <option value={CONST.BLANK}>{CONST.BLANK}</option>
                    </select>
                  </span>
                  <span>
                    <select
                      onChange={this.handleSelect('WRITE', idx, nodeName)}
                      defaultValue={rule.write}
                    >
                      <option value="0">0</option> 
                      <option value="1">1</option>
                      <option value="#">#</option>
                      <option value={CONST.BLANK}>{CONST.BLANK}</option>
                    </select>
                  </span>
                  <span>                    
                    <select
                      onChange={this.handleSelect('MOVE', idx, nodeName)}
                      defaultValue={rule.move}
                    >
                      <option value="RIGHT">RIGHT</option> 
                      <option value="LEFT">LEFT</option>
                      <option value=""></option>
                    </select>
                  </span>
                  <span>                    
                    <select
                      onChange={this.handleSelect('NEXT', idx, nodeName)}
                      defaultValue={rule.next}
                    >
                      <option value="A">A</option> 
                      <option value="B">B</option>
                      <option value="ACCEPT">ACCEPT</option>
                    </select>
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