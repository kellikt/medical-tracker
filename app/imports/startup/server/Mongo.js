import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Notifications } from '../../api/notifications/Notifications';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// initialize database with default notifications document
function addNotifications(data) {
  console.log(`  Adding Default Notification: ${data.description} (${data.patientID})`);
  Notifications.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the NotificationsCollection if empty.
if (Notifications.collection.find().count() === 0) {
  if (Meteor.settings.defaultNotifications) {
    console.log('Creating default notifications.');
    Meteor.settings.defaultNotifications.map(data => addNotifications(data));
  }
}
