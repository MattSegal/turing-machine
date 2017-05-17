import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'scss/program.scss'

class Program extends Component
{
  render()
  {
    const {graph} = this.props
    return (
      <div>
        <h1>Program</h1>
        <div className={style.node}>
            <div className={style.topHeader}></div>
            <div className={style.nodeRules}>
              <div className={style.rule}>
                <span className={style.header}>Read</span>
                <span className={style.header}>Write</span>
                <span className={style.header}>Move</span>
                <span className={style.header}>Next</span>
              </div>
            </div>
          </div>
        {Object.keys(graph).map(key => (
          <div key={key} className={style.node}>
            <div className={style.nodeHeader}>{key}</div>
            <div className={style.nodeRules}>
              {graph[key].map((rule, idx) => (
                <div key={idx} className={style.rule}>
                  <span>
                    <select defaultValue={rule.read}>
                      <option value="0">0</option> 
                      <option value="1">1</option>
                      <option value="#">#</option>
                    </select>
                  </span>
                  <span>
                    <select defaultValue={rule.write}>
                      <option value="0">0</option> 
                      <option value="1">1</option>
                      <option value="#">#</option>
                    </select>
                  </span>
                  <span>                    
                    <select defaultValue={rule.write}>
                      <option value="RIGHT">RIGHT</option> 
                      <option value="LEFT">LEFT</option>
                    </select>
                  </span>
                  <span>                    
                    <select defaultValue={rule.write}>
                      <option value="A">A</option> 
                      <option value="B">B</option>
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