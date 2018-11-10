import React, { Component } from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import Compose from './components/Compose';
import './App.css';

class App extends Component {
  state = {
    messages: [],
    display: false
  }

  toggleSelected = (id) => {
    let { messages } = this.state;
    messages.forEach(message => {
      if (message.id === id) {
        message.selected = !message.selected
      }
    })
    this.setState({ messages });
  }

  toggleStarred = (id) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        "messageIds": [id],
        "command": 'star'
      })
    }).then(results => {
      let { messages } = this.state;
      messages.forEach(message => {
        if (message.id === id) {
          message.starred = !message.starred
        }
      })
      this.setState({ messages });
    })
      .catch(error => {
        console.error(error);
      })
  }

  toggleAll = () => {
    let { messages } = this.state;
    let anyMessages = messages.filter(message => message.selected === false);
    messages.forEach(message => {
      message.selected = (anyMessages.length > 0 ? true : false);
    });
    this.setState({ messages });
  }

  toggleMessages = (bool) => {
    let { messages } = this.state;
    let messageIds = [];
    messages.forEach(message => {
      if (message.selected) {
        message.read = bool
        messageIds.push(message.id);
      }
    })
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        messageIds,
        command: 'read',
        read: bool
      })
    }).then(results => {
      this.setState({ messages });
    })
      .catch(error => {
        console.error(error);
      })
  }

  removeMessages = () => {
    let { messages } = this.state;
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        "messageIds": messages.filter(message => message.selected).map(m => m.id),
        "command": 'delete'
      })
    }).then(results => {
      this.setState({ messages: messages.filter(message => !message.selected) });
    })
      .catch(error => {
        console.error(error);
      })
  }

  addLabel = (label) => {
    let { messages } = this.state;
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        "messageIds": messages.filter(message => message.selected).map(m => m.id),
        "command": 'addLabel',
        label
      })
    }).then(results => {
      messages.forEach(message => {
        if (
          !message.labels.includes(label) &&
          message.selected
        ) {
          message.labels.push(label)
        }
      })
      this.setState({ messages });
    })
      .catch(error => {
        console.error(error);
      })
  }

  removeLabel = (label) => {
    let { messages } = this.state;
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        "messageIds": messages.filter(message => message.selected).map(m => m.id),
        "command": 'removeLabel',
        label
      })
    })
      .then(results => {
        messages.forEach(message => {
          if (message.selected) {
            message.labels = message.labels.filter(innerLabel => innerLabel !== label);
          }
        })
        this.setState({ messages });
      })
      .catch(error => {
        console.error(error);
      })
  }

  addMessage = (message) => {
    console.log(message);
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        subject: message.subject,
        body: message.body
      })
    })
    .then(() => {
      this.getMessages();
    })
  }
  
  getMessages = async () => {
    const results = await fetch('http://localhost:8082/api/messages');
    const messages = await results.json();
    this.setState({messages});
  }

  toggleDisplay = () => {
    this.setState({display: !this.state.display})
  }
  
  render() {
    return (
      <div className="App">
        
        <Toolbar
          display={this.state.display}
          toggleDisplay={this.toggleDisplay}
          unreadCount={this.state.messages.filter(message => !message.read).length}
          toggleAll={this.toggleAll}
          readMessages={this.toggleMessages.bind(null, true)}
          unreadMessages={this.toggleMessages.bind(null, false)}
          removeMessages={this.removeMessages}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
        />
        { this.state.display ? <Compose add={this.addMessage} /> : false }
        <MessageList
          onSelect={this.toggleSelected}
          onStar={this.toggleStarred}
          messages={this.state.messages}
        />
      </div>
    );
  }

  componentDidMount() {
    this.getMessages();
  }
}

export default App;
