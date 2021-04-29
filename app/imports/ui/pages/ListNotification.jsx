import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Table, Header, Input, Message, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import NotificationItem from '../components/NotificationItem';
import { Notifications } from '../../api/notifications/Notifications';

/** Renders a table containing all of the Notification documents. Use <NotificationItem> to render each row. */
class ListNotification extends React.Component {

  submitID() {
    swal('Success', 'This should populate the list notification table with a list of active notifications for the patient associated with the inputted patient ID.', 'success');
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Notifications</Header>
        <Message>
          <Message.Header>Note for Prototype Purposes</Message.Header>
          <p>
            This page is supposed to auto-populate data when the submit button is pressed and a valid patient ID is entered.
            Since the back-end is not implemented yet, an example list of notifications is listed below.
            Please press the Edit link to go to the Edit Notification page.
          </p>
        </Message>
        <Input size='huge'action={{ color: 'blue', content: 'Submit', onClick: () => this.submitID() }} placeholder='Enter Patient ID' />
        <Table size='large' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Start Time Range</Table.HeaderCell>
              <Table.HeaderCell>End Time Range</Table.HeaderCell>
              <Table.HeaderCell>Send Time</Table.HeaderCell>
              <Table.HeaderCell>Frequency</Table.HeaderCell>
              <Table.HeaderCell>Instructions</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.notifications.map((notification) => <NotificationItem key={notification._id} notification={notification} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Notification documents in the props.
ListNotification.propTypes = {
  notifications: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Notification documents.
  const subscription = Meteor.subscribe(Notifications.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Notification documents
  const notifications = Notifications.collection.find({}).fetch();
  return {
    notifications,
    ready,
  };
})(ListNotification);
