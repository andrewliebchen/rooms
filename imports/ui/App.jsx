import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Rooms } from '../api/rooms';

class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const roomName = ReactDOM.findDOMNode(this.refs.roomName).value.trim();

    Rooms.insert({
      name: roomName,
      createdAt: new Date()
    }, (error, success) => {
      if (success) {
        ReactDOM.findDOMNode(this.refs.roomName).value = '';
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Rooms</h1>
        <div className="Rooms">
          {this.props.rooms.map((room) => {
            return <div key={room._id}>{room.name}</div>;
          })}
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            required
            ref="roomName"
            placeholder="Type and press enter to create a room"/>
        </form>
      </div>
    );
  }
}

App.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    rooms: Rooms.find({}, { sort: { createdAt: -1 }}).fetch(),
  };
}, App);
