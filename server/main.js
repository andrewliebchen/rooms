import { Meteor } from 'meteor/meteor';

import { Rooms } from '../imports/api/rooms.js';

Meteor.startup(() => {
  if (Rooms.find({}).fetch().length === 0) {
    console.log('Adding default room');
    Meteor.call('createRoom', {
      name: 'Default Room',
      createdAt: Date.now(),
      createdBy: null,
    });
  }
});
