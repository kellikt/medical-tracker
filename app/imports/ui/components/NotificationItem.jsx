import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>05/01/2021</Table.Cell>
        <Table.Cell>05/31/2021</Table.Cell>
        <Table.Cell>5:00 PM</Table.Cell>
        <Table.Cell>Daily</Table.Cell>
        <Table.Cell>Take 1 Vicodin tablet, avoid drinking alcohol and taking sedative medication</Table.Cell>
        <Table.Cell>
          <Link to={'/edit-notification'}>Edit <Icon name='edit'/></Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StuffItem);
