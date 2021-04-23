import React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TreatmentLogItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>03/31/2021</Table.Cell>
        <Table.Cell>03/31/2022</Table.Cell>
        <Table.Cell>Weekly</Table.Cell>
        <Table.Cell>Take one (1) tablet of aspirin with a glass of water.</Table.Cell>
      </Table.Row>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(TreatmentLogItem);
