import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
              ICS 464 Team Project<br />
              Team Members: Rusty Jacinto, Sun Young Kim, Len Nguyen, Joel Sikkink, and Kelli Tamashiro<br />
          <a href="https://github.com/kellikt/medical-tracker">GitHub Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
