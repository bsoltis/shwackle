import React, { Component } from 'react';
import Navigation from './navigation';
import { withAuthentication } from './Session';

class App extends Component {

    render() {
        return <Navigation />;
    }
}

export default withAuthentication(App);