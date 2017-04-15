import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import RoomsList from './RoomsList';
import Room from './Room';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={RoomsList}/>
          <Route path="/:id" component={Room}/>
        </div>
      </Router>
    );
  }
}
