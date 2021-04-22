import { Meteor } from 'meteor/meteor';
import { Patients } from '../../api/patients/Patients.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Patients.insert(data);
}

/** Initialize the collection if empty. */
if (Patients.find().count() === 0) {
  if (Meteor.settings.defaultPatients) {
    console.log('Creating default data.');
    Meteor.settings.defaultPatients.map(data => addData(data));
  }
}

Meteor.publish('Patients', function publish() {
 return Patients.find({});
 return this.ready();
});

Meteor.methods({
  deletePatient: function(removeId){
    return Patients.remove(removeId);
  },
});