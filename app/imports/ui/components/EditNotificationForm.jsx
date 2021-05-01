import React, { Component } from 'react';
import {
  Button,
  Form,
  Radio,
  TextArea,
} from 'semantic-ui-react';
import { TimePicker, DatePicker } from 'antd';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'antd/dist/antd.css';
import swal from 'sweetalert';
import { Notifications } from '../../api/notifications/Notifications';

const { RangePicker } = DatePicker;

class EditNotificationForm extends Component {
  state = { patientID: this.props.doc.patientID, sendTime: this.props.doc.sendTime, startDate: this.props.doc.startDate, endDate: this.props.doc.endDate, frequency: this.props.doc.frequency, description: this.props.doc.description }

  onTimeChange = (time) => this.setState({ sendTime: time })

  onDateChange = (dates) => this.setState({ startDate: dates[0], endDate: dates[1] })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  submitNotification = () => {

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.sendTime = moment(this.state.sendTime).format('h:mm a');
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.startDate = moment(this.state.startDate).format('MM-DD-YYYY');
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.endDate = moment(this.state.endDate).format('MM-DD-YYYY');
    const _id = this.props.doc._id;
    const { patientID, sendTime, startDate, endDate, frequency, description } = this.state;
    Notifications.collection.update(_id, { $set: { patientID, sendTime, startDate, endDate, frequency, description } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Notification updated successfully', 'success');
          this.setState({ patientID: '', sendTime: '', startDate: '', endDate: '', frequency: '', description: '' });
          // formRef.reset();
        }
      });
    // swal('Success', 'This should add a new notification.', 'success');
    // this.setState({ patientID: '', sendTime: '', startDate: '', endDate: '', frequency: '', description: '' });
  }

  render() {

    const { patientID, sendTime, dates, frequency, description } = this.state;
    return (
      <Form onSubmit={this.submitNotification}>
        <Form.Group inline>
          <label>Patient ID</label>
          <Form.Input defaultValue={this.props.doc.patientID} placeholder='Enter Patient ID Number' width={4} name='patientID' value={patientID} onChange={this.handleChange} />
          <label>Send Time</label>
          <TimePicker value={sendTime} use12Hours format="h:mm a" onChange={this.onTimeChange} />
          <label style={{ padding: '0px 0px 0px 30px' }}>Date Range</label>
          <RangePicker value={dates} onChange={this.onDateChange} />
        </Form.Group>
        <Form.Group inline>
          <label>Frequency</label>
          <Form.Field
            control={Radio}
            name='frequency'
            label='Daily'
            value='daily'
            checked={frequency === 'daily'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            name='frequency'
            label='Weekly'
            value='weekly'
            checked={frequency === 'weekly'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            name='frequency'
            label='Monthly'
            value='monthly'
            checked={frequency === 'monthly'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Enter medical instructions from provider'
          value={description}
          onChange={this.handleChange}
          defaultValue={this.props.doc.description}
        />
        <Form.Field control={Button} color='blue'>Add New Notification</Form.Field>
      </Form>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditNotificationForm.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Notifications.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Notifications.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditNotificationForm);
