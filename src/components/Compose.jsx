import React, { Component } from 'react'

export class Compose extends Component {
  state = {
    subject: '',
    body: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add(this.state);
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value});

  render() {
    return (
      <div className="well well-lg">
        <h1>Compose Messages</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="">
              Subject:
            </label>
            <input
              onChange={this.handleChange}
              type="text" 
              className="form-control" 
              name="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="">
              Body:
            </label>
            <textarea
              onChange={this.handleChange} 
              name="body" 
              className="form-control" 
              cols="30" 
              rows="10"></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Compose
