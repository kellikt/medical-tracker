import React from 'react';
import { Grid, Loader, Header, Segment, Divider, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import AddNotificationForm from '../components/AddNotificationForm';

/** Renders the Page for adding a single document. */
class AddNotification extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    console.log(data);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" color="blue">Add Notification</Header>
          <Divider/>
          <Message>
            <Message.Header>Instructions</Message.Header>
            <p>
              Please enter your notification information in these fields. You can type in the Send Time manually instead of using the time picker.
              Please use the format "hh:mm aa" (example: "12:00 pm") when typing in the time. You can also type in the Date Range manually. Please use the format "mm-dd-yyyy" (example: "01-01-2021"). Click Add New Notification when finished or Cancel
              if you want to cancel this operation. Once a new notification is added, you can create another notification on this same page.
            </p>
          </Message>
          <Segment>
            <AddNotificationForm/>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
AddNotification.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Stuffs.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(AddNotification);
