import React, { Component } from 'react';
import {
  Button,
  Form,
  Radio,
  TextArea,
} from 'semantic-ui-react';
import { TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import swal from 'sweetalert';
import { Notifications } from '../../api/notifications/Notifications';

const { RangePicker } = DatePicker;

class AddNotificationForm extends Component {
  state = { patientID: '', sendTime: '', startDate: '', endDate: '', frequency: '', description: '' }

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
    const { patientID, sendTime, startDate, endDate, frequency, description } = this.state;
    Notifications.collection.insert({ patientID, sendTime, startDate, endDate, frequency, description },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Notification added successfully', 'success');
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
          <Form.Input placeholder='Enter Patient ID Number' width={4} name='patientID' value={patientID} onChange={this.handleChange} />
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
        />
        <Form.Field control={Button} color='blue'>Add New Notification</Form.Field>
      </Form>
    );
  }
}

export default AddNotificationForm;
