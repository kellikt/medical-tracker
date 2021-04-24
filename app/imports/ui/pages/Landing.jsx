import React from 'react';
import { Form, Grid, Header, Message } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  submitID() {
    swal('Success', 'This should connect the landing page with the associated patient account from the inputted patient ID', 'success');
  }

  render() {
    return (
      <Grid id='landing-page' container>
        {this.props.currentUser ? (
          [
            <Grid.Row key="welcome">
              <Header size="huge">Welcome</Header>
            </Grid.Row>,
            <Message key="note">
              <Message.Header>Note for Prototype Purposes</Message.Header>
              <p>
                This page is supposed to connect a patient account when the submit button is pressed and a valid patient ID is entered.
                Since the back-end is not implemented yet, a set of buttons/links are listed below, as if a valid patient ID has already been entered.
              </p>
            </Message>,
            <Grid.Row key="help-patient">
              <Grid.Column width={3} floated="right">
                <Header>Help a Patient:</Header>
              </Grid.Column>
              <Grid.Column width={9}>
                <Header> </Header>
              </Grid.Column>
            </Grid.Row>,
            <Grid.Row centered key="patient-id">
              <label style={{ padding: '5px 30px 0px 30px' }}>Enter Patient ID:</label>
              <Form.Input
                placeholder="Patient ID"
              />
              <Form.Button color="blue" id="landing-submit" content="Submit" onClick={this.submitID}/>

              <Link style={{ padding: '5px 0px 0px 10px' }} to="/add-account">New Patient?</Link>
            </Grid.Row>,
            <Grid.Row centered key="notifications">
              <Grid.Column width={2} floated="right">
                <Header>Notifications:</Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header> </Header>
              </Grid.Column>
            </Grid.Row>,
            <Grid.Row columns={16} key="add">
              <Grid.Column width={3} floated="right">
                <Link to="/add-notification"><Form.Button color="blue" id="add-notif"
                  content="Add Notification"/></Link>
              </Grid.Column>
              <Grid.Column width={3} floated="left">
                <Link to="/list-notification"><Form.Button color="blue" id="edit-notif"
                  content="List Notifications"/></Link>
              </Grid.Column>
            </Grid.Row>,
            <Grid.Row key="records">
              <Grid.Column width={2} floated="right">
                <Header>Records:</Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header> </Header>
              </Grid.Column>
            </Grid.Row>,
            <Grid.Row key="edit">
              <Grid.Column width={3} floated="right">
                <Link to="/edit-account"><Form.Button color="blue" id="account" content="Edit Account"/></Link>
              </Grid.Column>
              <Grid.Column width={3} floated="left">
                <Link to="/treatment-log"><Form.Button color="blue" id="treatment-log" content="Treatment Log"/></Link>
              </Grid.Column>
            </Grid.Row>,
          ]
        ) :
          [<Grid.Column key='log-in' textAlign="center">
            <Header size="huge">Please Log In</Header>
            <Message>
              <p>This website is for authorized use by medical administrators or professionals only. You must log in before accessing this website.</p>
            </Message>
            <Link key='link-log-in' to="/login"><Form.Button size="massive" color="blue" key='form-log-in' id="log in" content="Log In"/></Link>
          </Grid.Column>,
          ]
        }
      </Grid>
    );
  }
}

// Declare the types of all properties.
Landing.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(LandingContainer);
