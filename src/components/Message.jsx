import React, { Component } from 'react'
import Labels from './Labels';

export class Message extends Component {
  state = {
    show: false
  }

  render() {
    const { message, onSelect, onStar } = this.props;
    let { show } = this.state;

    return (
      <div className={`row message 
      ${message.selected ? 'selected ' : ''}
      ${message.read ? 
        'read' : 
        'unread'
      }`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" 
                defaultChecked={message.selected}
                onClick={onSelect} />
            </div>
            <div className="col-xs-2">
              <i onClick={onStar}
                className={`star fa ${message.starred ? 
                'fa-star' : 
                'fa-star-o'
                }`
              }></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={() => this.setState({ show: !show})}>
          <Labels labels={message.labels} />
          <a href="#">
            {message.subject}
          </a>
        </div>
        {!show ? false : (
          <div>
            { message.body }
          </div>
          )
        }
      </div>
    )
  }
}

export default Message
