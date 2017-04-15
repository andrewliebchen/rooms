import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';

import { Rooms } from '../api/rooms';

class Room extends Component {
  render() {
    if (this.props.room) {
      return (
        <div className="Room">
          <h1>{this.props.room.name}</h1>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

Room.propTypes = {
  room: PropTypes.object
};

export default createContainer((props) => {
  return {
    room: Rooms.findOne(props.match.params.id)
  };
}, Room);
