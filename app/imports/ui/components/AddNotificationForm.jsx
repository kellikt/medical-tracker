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

const { RangePicker } = DatePicker;

class AddNotificationForm extends Component {
  state = {}

  onChange = (time, timeString) => console.log(time, timeString)

  handleChange = (e, { value }) => this.setState({ value })

  submitNotification() {
    swal('Success', 'This should add a new notification.', 'success');
  }

  render() {
    const { value } = this.state;
    return (
      <Form onSubmit={this.submitNotification}>
        <Form.Group inline>
          <label>Patient ID</label>
          <Form.Input placeholder='Enter Patient ID Number' width={4} />
          <label>Send Time</label>
          <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
          <label style={{ padding: '0px 0px 0px 30px' }}>Date Range</label>
          <RangePicker />
        </Form.Group>
        <Form.Group inline>
          <label>Frequency</label>
          <Form.Field
            control={Radio}
            label='Daily'
            value='1'
            checked={value === '1'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='Weekly'
            value='2'
            checked={value === '2'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='Monthly'
            value='3'
            checked={value === '3'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='Description'
          placeholder='Enter medical instructions from provider'
        />
        <Form.Field control={Button}>Add New Notification</Form.Field>
      </Form>
    );
  }
}

export default AddNotificationForm;
