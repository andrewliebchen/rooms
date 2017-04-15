import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';

import Loading from './Loading';

import { Rooms } from '../api/rooms';

class Room extends Component {
  renderRoom() {
    return (
      <div className="Room">
        <h1>{this.props.room.name}</h1>
      </div>
    );
  }

  render() {
    return this.props.room ? this.renderRoom() : <Loading/>;
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
