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
                      <option value="0">1</option> 
                      <option value="1">0</option>
                    </select>
                  </span>
                  <span>{rule.write}</span>
                  <span>{rule.move}</span>
                  <span>{rule.next}</span>
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