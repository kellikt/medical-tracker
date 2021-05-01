import React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TreatmentLogPlan extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.notification.startDate}</Table.Cell>
        <Table.Cell>{this.props.notification.endDate}</Table.Cell>
        <Table.Cell>{this.props.notification.frequency}</Table.Cell>
        <Table.Cell>{this.props.notification.description}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
TreatmentLogPlan.propTypes = {
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
export default withRouter(TreatmentLogPlan);
