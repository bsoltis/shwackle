import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {


        this.props.firebase.store
            .collection("users").onSnapshot(snapshot => {

                var users = [];
                snapshot.forEach(function(doc) {
                    var user = {id: doc.id, data: doc.data()};
                    users.push(user);
                });

                this.setState({
                    users: users,
                });
            });
    }

    onChange = (event) => {
        this.props.firebase.store
            .collection("users")
            .doc(event.target.id)
            .update({
                email: event.target.value
            });
    }

    render() {
        const users = this.state.users;

        return (
            <div className="dashboard">
                {users.map(user => (

                    <input type="text" value={user.data.email} id={user.id} key={user.id} onChange={this.onChange} />

                ))}
            </div>
        );
    }

}
export default withFirebase(Dashboard);