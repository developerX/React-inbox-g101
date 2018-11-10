import React, { Component } from 'react'
import Message from './Message';

export class MessageList extends Component {
  render() {
    const { messages, onSelect, onStar } = this.props;
    return (
      <div>
        {messages.map(message => (
          <Message 
            key={message.id} 
            message={message}
            onSelect={onSelect.bind(null, message.id)}
            onStar={onStar.bind(null, message.id)}
          />
        ))}
      </div>
    )
  }
}

export default MessageList
