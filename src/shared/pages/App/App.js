import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Header from './Header/Header';

import { connect } from 'react-redux'
import { attemptLogin } from 'shared/modules/user/userActions'

class App extends Component {

  logUserIn = () => {
    this.props.dispatch(attemptLogin())
  }

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
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {

  }
}

export default connect(mapStateToProps)(App)