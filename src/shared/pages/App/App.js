import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Header from './Header/Header';

class App extends Component {

  render() {
    return (
      <div>
        <Helmet title="React Universal Starter Kit" />
        <Header onLoginButtonClicked={this.logUserIn} />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App