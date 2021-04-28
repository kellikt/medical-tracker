import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class NotificationItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.notification.startDate}</Table.Cell>
        <Table.Cell>{this.props.notification.endDate}</Table.Cell>
        <Table.Cell>{this.props.notification.sendTime}</Table.Cell>
        <Table.Cell>{this.props.notification.frequency}</Table.Cell>
        <Table.Cell>{this.props.notification.description}</Table.Cell>
        <Table.Cell>
          <Link to={'/edit-notification'}>Edit <Icon name='edit'/></Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
NotificationItem.propTypes = {
  notification: PropTypes.shape({
    sendTime: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    frequency: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(NotificationItem);
