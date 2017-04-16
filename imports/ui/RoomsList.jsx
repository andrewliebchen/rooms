import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AccountsUIWrapper from './AccountsUIWrapper';

import { Rooms } from '../api/rooms';

class RoomsList extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();

    Meteor.call('createRoom', {
      name: name,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
    }, (error, success) => {
      if (success) {
        ReactDOM.findDOMNode(this.refs.name).value = '';
      }
    });
  }

  renderCreateRoom() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          required
          ref="name"
          placeholder="Type and press enter to create a room"/>
      </form>
    );
  }

  render() {
    return (
      <div className="Rooms">
        <h1>Rooms</h1>
        <AccountsUIWrapper/>
        <ul>
          {this.props.rooms.map((room) => {
            return (
              <li key={room._id}>
                <Link to={room._id}>{room.name}</Link>
              </li>
            );
          })}
        </ul>
        {Meteor.user() && this.renderCreateRoom()}
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
