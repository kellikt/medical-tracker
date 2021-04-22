import React from 'react';
import { Container, Table, Header, Input, Message } from 'semantic-ui-react';
import NotificationItem from '../components/NotificationItem';

/** Renders a table containing all of the Notification documents. Use <NotificationItem> to render each row. */
class ListNotification extends React.Component {

  // Render the page once subscriptions have been received.
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Notifications</Header>
        <Message>
          <Message.Header>Note for Prototype Purposes</Message.Header>
          <p>
            This page is supposed to auto-populate data when the submit button is pressed and a valid patient ID is entered.
            Since the back-end is not implemented yet, pressing submit will populate an example list of notifications.
            Please press the submit button once to show the example list of notifications that you can edit.
          </p>
        </Message>
        <Input action='Submit' placeholder='Enter Patient ID' />
        <Table celled>
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
            <NotificationItem/>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default ListNotification;
