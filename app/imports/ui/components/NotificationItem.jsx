import React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>03/31/2021</Table.Cell>
        <Table.Cell>03/31/2022</Table.Cell>
        <Table.Cell>8:00 AM</Table.Cell>
        <Table.Cell>Weekly</Table.Cell>
        <Table.Cell>Take Pill A</Table.Cell>
        <Table.Cell>
          <Link to={'/edit-notification'}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StuffItem);
