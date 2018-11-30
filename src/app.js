import React, { Component } from 'react';

import { withFirebase } from './Firebase';
import Navigation from './navigation';

class App extends Component {
    state = {
        authenticated: false,
    };

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged((authenticated) => {
          authenticated
            ? this.setState(() => ({
                authenticated: true,
              }))
            : this.setState(() => ({
                authenticated: false,
              }));
        });
    }

    render() {
        return <Navigation authenticated={this.state.authenticated} />;
    }
}

export default withFirebase(App);