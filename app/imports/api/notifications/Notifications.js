import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The Notifications Collection. It encapsulates state and variable values for notifications.
 */
class NotificationsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'NotificationsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      patientID: Number,
      sendTime: String,
      startDate: String,
      endDate: String,
      frequency: {
        type: String,
        allowedValues: ['daily', 'weekly', 'monthly'],
        defaultValue: 'good',
      },
      description: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Notifications = new NotificationsCollection();
