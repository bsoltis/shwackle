import React from 'react';
import firebase from 'firebase';

const logOutUser = () => {
    firebase.auth().signOut();
};

const LogOut = () => {
    return <a href="#" onClick={logOutUser} className="item">Log Out</a>;
};

export default LogOut;