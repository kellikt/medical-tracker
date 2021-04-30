import React from 'react';
import { Grid, Loader, Header, Segment, Form, Radio, TextArea, Button, Divider, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Notifications } from '../../api/notifications/Notifications';
// import EditNotificationForm from '../components/EditNotificationForm';

const { RangePicker } = DatePicker;

/** Renders the Page for editing a single document. */
class EditNotification extends React.Component {

  state = { patientID: '', sendTime: '', startDate: '', endDate: '', frequency: '', description: '' }

  finalState = { patientID: '', sendTime: '', startDate: '', endDate: '', frequency: '', description: '' }

  timeChange = false

  dateChange = false

  IDChange = false

  descChange = false

  freqChange = false

  onTimeChange = (time) => {
    this.timeChange = true;
    this.setState({ sendTime: time });
  }

  onDateChange = (dates) => {
    this.dateChange = true;
    this.setState({ startDate: dates[0], endDate: dates[1] });
  }

  onIDChange = (e, { value }) => {
    this.IDChange = true;
    this.setState({ patientID: value });
  }

  onDescChange = (e, { value }) => {
    this.descChange = true;
    this.setState({ description: value });
  }

  onFreqChange = (e, { value }) => {
    this.freqChange = true;
    this.setState({ frequency: value });
  }

  submitNotification = () => {
    // eslint-disable-next-line react/no-direct-mutation-state
    if (this.state.patientID === '') {
      // this.setState({ patientID: this.props.doc.patientID });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.patientID = this.props.doc.patientID;
    } else {
      this.finalState.patientID = this.state.patientID;
    }
    if (this.state.sendTime === '') {
      // this.setState({ sendTime: this.props.doc.sendTime });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.sendTime = this.props.doc.sendTime;
    } else {
      // this.setState({ sendTime: moment(this.state.sendTime).format('h:mm a') });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.sendTime = moment(this.state.sendTime).format('h:mm a');
    }
    if (this.state.startDate === '') {
      // this.setState({ startDate: this.props.doc.startDate });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.startDate = this.props.doc.startDate;
    } else {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.startDate = moment(this.state.startDate).format('MM-DD-YYYY');
    }
    if (this.state.endDate === '') {
      // this.setState({ endDate: this.props.doc.endDate });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.endDate = this.props.doc.endDate;
    } else {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.endDate = moment(this.state.endDate).format('MM-DD-YYYY');
    }
    if (this.state.frequency === '') {
      // this.setState({ frequency: this.props.doc.frequency });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.frequency = this.props.doc.frequency;
    } else {
      this.finalState.frequency = this.state.frequency;
    }
    if (this.state.description === '') {
      // this.setState({ description: this.props.doc.description });
      // eslint-disable-next-line react/no-direct-mutation-state
      this.finalState.description = this.props.doc.description;
    } else {
      this.finalState.description = this.state.description;
    }
    const _id = this.props.doc._id;
    const { patientID, sendTime, startDate, endDate, frequency, description } = this.finalState;
    Notifications.collection.update(_id, { $set: { patientID, sendTime, startDate, endDate, frequency, description } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Notification updated successfully', 'success');
          // formRef.reset();
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { patientID, sendTime, dates, frequency, description } = this.state;

    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" color='blue'>Edit Notification</Header>
          <Divider/>
          <Message>
            <Message.Header>Instructions</Message.Header>
            <p>
              This page has the current notification's information pre-filled. You do not need to enter any information again,
              but make sure to enter your new changes. You can also type in the Send Time manually instead of using the time picker.
              Please use the format "hh:mm aa" (example: "12:00 pm") when typing in the time. You can also type in the Date Range manually. Please use the format "mm-dd-yyyy" (example: "01-01-2021"). Click Edit Notification when finished or Cancel
              if you want to cancel this operation.
            </p>
          </Message>
          <Segment>
            <Form size='large' onSubmit={this.submitNotification}>
              <Form.Group inline>
                <label>Patient ID</label>
                {this.IDchange ?
                  <Form.Input placeholder='Enter Patient ID Number' width={4} name='patientID' value={patientID}
                    onChange={this.onIDChange}/> :
                  <Form.Input placeholder='Enter Patient ID Number' width={4} name='patientID' defaultValue={this.props.doc.patientID}
                    onChange={this.onIDChange}/>
                }
                <label>Send Time</label>
                {this.timeChange ?
                  <TimePicker value={sendTime} use12Hours format="h:mm a" onChange={this.onTimeChange}/> :
                  <TimePicker defaultValue={moment(this.props.doc.sendTime, 'h:mm a')} use12Hours format="h:mm a" onChange={this.onTimeChange}/>
                }
                <label style={{ padding: '0px 0px 0px 30px' }}>Date Range</label>
                {this.dateChange ?
                  <RangePicker value={dates} onChange={this.onDateChange}/> :
                  <RangePicker defaultValue={[moment(this.props.doc.startDate), moment(this.props.doc.endDate)]} onChange={this.onDateChange}/>
                }
              </Form.Group>
              {this.freqChange ?
                <Form.Group inline>
                  <label>Frequency</label>
                  <Form.Field
                    control={Radio}
                    name='frequency'
                    label='Daily'
                    value='daily'
                    checked={frequency === 'daily'}
                    onChange={this.onFreqChange}
                  />
                  <Form.Field
                    control={Radio}
                    name='frequency'
                    label='Weekly'
                    value='weekly'
                    checked={frequency === 'weekly'}
                    onChange={this.onFreqChange}
                  />
                  <Form.Field
                    control={Radio}
                    name='frequency'
                    label='Monthly'
                    value='monthly'
                    checked={frequency === 'monthly'}
                    onChange={this.onFreqChange}
                  />
                </Form.Group> :
                <Form.Group inline>
                  <label>Frequency</label>
                  <Form.Field
                    control={Radio}
                    name='frequency'
                    label='Daily'
                    value='daily'
                    checked={this.props.doc.frequency === 'daily'}
                    onChange={this.onFreqChange}
                  />
                  <Form.Field
                    control={Radio}
                    name='frequency'
                    label='Weekly'
                    value='weekly'
                    checked={this.props.doc.frequency === 'weekly'}
                    onChange={this.onFreqChange}
                  />
                  <Form.Field
                    control={Radio}
                    name='frequency'
                    label='Monthly'
                    value='monthly'
                    checked={this.props.doc.frequency === 'monthly'}
                    onChange={this.onFreqChange}
                  />
                </Form.Group>
              }
              {this.descChange ?
                <Form.Field
                  control={TextArea}
                  name='description'
                  label='Description'
                  placeholder='Enter medical instructions from provider'
                  value={description}
                  onChange={this.onDescChange}
                /> :
                <Form.Field
                  control={TextArea}
                  name='description'
                  label='Description'
                  placeholder='Enter medical instructions from provider'
                  defaultValue={this.props.doc.description}
                  onChange={this.onDescChange}
                />
              }
              <Form.Group style={{ padding: '0px 0px 0px 10px' }}>
                <Link to="/list-notification"><Form.Button color="red" id="cancel" content="Cancel"/></Link>
                <Form.Field control={Button} color='blue'>Edit Notification</Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditNotification.propTypes = {
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
})(EditNotification);
