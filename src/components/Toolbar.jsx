import React, { Component } from 'react'

export class Toolbar extends Component {

  render() {
    
    const { 
      toggleAll, 
      readMessages, 
      unreadMessages, 
      removeMessages, 
      unreadCount,
      addLabel,
      removeLabel,
      display,
      toggleDisplay
  } = this.props;

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadCount}</span>
            unread messages
          </p>
          
          <button 
            className={`btn btn-lg ${display ? 'btn-warning':'btn-danger'}`}
            onClick={toggleDisplay}>
            +  
          </button>

          <button className="btn btn-default" onClick={toggleAll}>
            <i className="fa fa-square-o"></i>
          </button>

          <button 
            onClick={readMessages}
            className="btn btn-default">
            Mark As Read
          </button>

          <button 
            onClick={unreadMessages}
            className="btn btn-default" 
          >
            Mark As Unread
          </button>

          <select className="form-control label-select" defaultValue={""}
            onChange={(e) => addLabel(e.target.value) }>
            <option disabled value="">Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
          onChange={(e) => removeLabel(e.target.value) } >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button 
            onClick={removeMessages}
            className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
