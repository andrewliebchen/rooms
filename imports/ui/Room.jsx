import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';

import Loading from './Loading';

import { Rooms } from '../api/rooms';

class Room extends Component {
  renderScene() {
    return (
      <div className="Room">
        <Scene>
          <Entity
            geometry={{primitive: 'box'}}
            material={{color: 'white'}}
            position={{x: 0, y: 0, z: -5}}/>
          <Entity
            geometry={{primitive: 'sphere'}}
            material={{color: 'white'}}
            position={{x: -2, y: 0, z: -3}}/>

          <Entity
            light={{type: 'point', intensity: '0.8'}}
            position={{x: -5, y: 5, z: 0}}/>
          <Entity
            light={{type: 'point', intensity: '0.9'}}
            position={{x: 5, y: 5, z: -2}}/>

          <Entity particle-system={{preset: 'dust'}}/>
          <Entity
            text={{value: this.props.room.name}}
            position={{x: 0, y: 2, z: -1}}/>
        </Scene>
      </div>
    );
  }

  render() {
    return this.props.room ? this.renderScene() : <Loading/>;
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
