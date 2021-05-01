import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table, Header, Input, Message, Divider } from 'semantic-ui-react';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TreatmentLogItem from '../components/TreatmentLogItem';
import TreatmentLogPlan from '../components/TreatmentLogPlan';
import { Notifications } from '../../api/notifications/Notifications';

/** Renders a table containing all of the Notification documents. Use <NotificationItem> to render each row. */
class TreatmentLog extends React.Component {

  submitID() {
    swal('Success', 'This should populate the treatment table with the patient current treatment and the log table with the list of the days they have taken the treatment for the patient associated with the inputted patient ID.', 'success');
  }

  // Render the page once subscriptions have been received.
  render() {
    return (
      <Container>
        <Header color='blue' as="h2">Treatment Log</Header>
        <Divider/>
        <Message>
          <Message.Header>Note for Prototype Purposes</Message.Header>
          <p>
            {/* eslint-disable-next-line max-len */}
              This page is supposed to auto-populate data when the submit button is pressed and a valid patient ID is entered. Since the back-end is not implemented yet, pressing submit will populate an example log of a patient. Please press the search button once to show the example treatment plan and example log of a patient.
          </p>
        </Message>
        <Input size='large' action={{ color: 'blue', icon: 'search', onClick: () => this.submitID() }} placeholder='Enter Patient ID' />
        <Header as="h3">Patient Treatment Plan</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Frequency</Table.HeaderCell>
              <Table.HeaderCell>Instructions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.notifications.map((notification) => <TreatmentLogPlan key={notification._id} notification={notification} />)}
          </Table.Body>
        </Table>
        <Header as="h3">Patient Log</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Treatment Taken</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TreatmentLogItem/>
        </Table>
      </Container>
    );
  }
}

// Require an array of Notification documents in the props.
TreatmentLog.propTypes = {
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
})(TreatmentLog);
