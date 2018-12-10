import React, { Component } from 'react';

import { withFirebase } from './Firebase';
import Navigation from './navigation';
import { withAuthentication } from './Session';

class App extends Component {
    // state = {
    //     authenticated: false,
    // };

    // componentDidMount() {
    //     this.props.firebase.auth.onAuthStateChanged((authenticated) => {
    //       authenticated
    //         ? this.setState(() => ({
    //             authenticated: true,
    //           }))
    //         : this.setState(() => ({
    //             authenticated: false,
    //           }));
    //     });
    // }


    render() {
        return <Navigation />;
    }
}

export default withAuthentication(App);