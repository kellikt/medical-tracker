import React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TreatmentLogItem extends React.Component {
  render() {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>03/31/2021</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>04/7/2021</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>04/14/2021</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(TreatmentLogItem);
