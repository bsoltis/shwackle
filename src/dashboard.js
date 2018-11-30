import React, { Component } from 'react';
import firebase from './firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        }
    }

    componentWillUnmount() {
        firebase.database().ref('users').off();
    }

    componentDidMount() {
        var usersRef = firebase.database().ref('users');
        usersRef.on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
            });
        });
    }

    render() {
        const users = this.state.users;

        return (
            <ul className="dashboard">
                {users.map(user => (
                    <li key={user.uid}>
                    <span>
                        <strong>E-Mail:</strong> {user.email}
                    </span>
                    <span>
                        <strong>Username:</strong> {user.username}
                    </span>
                    </li>
                ))}
            </ul>
        );
    }

}
export default Dashboard;