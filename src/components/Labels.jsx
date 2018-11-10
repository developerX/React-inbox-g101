import React, { Component } from 'react'

export class Labels extends Component {
  render() {
    return (
      <div>
        { this.props.labels.map(label => (
          <span key={label} className="label label-warning">
            {label}
          </span>
        ))}
      </div>
    )
  }
}

export default Labels
