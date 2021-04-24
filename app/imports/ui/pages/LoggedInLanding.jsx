import React from 'react';
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class LoggedInLanding extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='left' container>


          <Grid.Column width={8}>
            <h1>Welcome</h1>
            <h3>Help A Patient</h3>
            <p>Patient ID</p>
            <Form.Input
                placeholder="##########"
            />
            <Form.Button id="landing-submit" content="Submit"/>

              <Link to="/add-account">New Patient?</Link>

            <br/>
            <p>
              Notifications
            </p>
            <Form.Button id="add-notif" content="ADD"/>
            <br/>
            <Form.Button id="edit-notif" content="EDIT"/>
            <br/>

            <p></p>
            <p>Records</p>
            <Form.Button id="account" content="Acount"/>
            <br/>
            <Form.Button id="treatment-log" content="Treatment Log"/>
          </Grid.Column>

        </Grid>


    );
  }
}

export default LoggedInLanding;
