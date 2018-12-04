import React from 'react';
import firebase from 'firebase';
import { Button } from 'semantic-ui-react';

const logOutUser = () => {
    firebase.auth().signOut();
};

const LogOut = () => {
    return (
        <Button onClick={logOutUser} inverted>
            Log Out
        </Button>
    );
};

export default LogOut;