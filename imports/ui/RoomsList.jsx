import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Rooms } from '../api/rooms';

class RoomsList extends Component {
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
      <div className="Romas">
        <h1>Rooms</h1>
        {this.props.rooms.map((room) => {
          return <Link key={room._id} to={room._id}>{room.name}</Link>;
        })}
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

RoomsList.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    rooms: Rooms.find({}, { sort: { createdAt: -1 }}).fetch(),
  };
}, RoomsList);
