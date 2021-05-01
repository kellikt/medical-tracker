import React from 'react';
import { Container, Table, Header, Input, Message } from 'semantic-ui-react';
import swal from 'sweetalert';
import TreatmentLogItem from '../components/TreatmentLogItem';
import TreatmentLogPlan from '../components/TreatmentLogPlan';

/** Renders a table containing all of the Notification documents. Use <NotificationItem> to render each row. */
class TreatmentLog extends React.Component {

  submitID() {
    swal('Success', 'This should populate the treatment table with the patient current treatment and the log table with the list of the days they have taken the treatment for the patient associated with the inputted patient ID.', 'success');
  }

  // Render the page once subscriptions have been received.
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Treatment Log</Header>
        <Message>
          <Message.Header>Note for Prototype Purposes</Message.Header>
          <p>
            {/* eslint-disable-next-line max-len */}
              This page is supposed to auto-populate data when the submit button is pressed and a valid patient ID is entered. Since the back-end is not implemented yet, pressing submit will populate an example log of a patient. Please press the submit button once to show the example treatment plan and example log of a patient.
          </p>
        </Message>
        <Input action={{ color: 'blue', icon: 'search', onClick: () => this.submitID() }} placeholder='Enter Patient ID' />
        <Header as="h3" textAlign="center">Patient Treatment Plan</Header>
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
            <TreatmentLogPlan/>
          </Table.Body>
        </Table>
        <Header as="h3" textAlign="center">Patient Log</Header>
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

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default TreatmentLog;
