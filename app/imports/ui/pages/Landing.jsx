import React from 'react';
import { Form, Grid, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>


        <Grid.Column width={8}>
          <h1>Please Log In</h1>
          <Form.Button id="log in" content="Log In"/>
          <Link to="/login">Button will Link to Log In Page</Link>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
