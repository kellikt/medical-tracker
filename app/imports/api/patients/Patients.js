import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Patients = new Mongo.Collection('Patients');

/** Create a schema to constrain the structure of documents associated with this collection. */
const PatientSchema = new SimpleSchema({
	patientName: String,
	patientID: String,
	patientEmail: String,
	patientPhone: String,
	emailPref: {type: Boolean},
	phonePref: {type: Boolean},
	recievePref: {
		type: String,
		allowedValues: ['All notifications','Daily notifications','Appointment reminders only'],
		defaultValue: 'All notifications',
	},
	submitter: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Patients.attachSchema(PatientSchema);
Patients.userPublicationName = `${this.name}.publication.user`;
Patients.adminPublicationName = `${this.name}.publication.admin`;
/** Make the collection and schema available to other code. */
export { Patients, PatientSchema };




