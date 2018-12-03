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
                    users.push(doc.data())
                });

                this.setState({
                    users: users,
                });
            });
    }

    onChange = (event) => {
        this.props.firebase.store
            .collection("projects")
            .doc("1")
            .update({
                name: event.target.value
            });
    }

    render() {
        const users = this.state.users;

        return (
            <div className="dashboard">
                {users.map(user => (
                    
                    <input type="text" value={user.email} id={user.uid} key={user.uid} onChange={this.onChange} />
                    
                ))}
            </div>            
        );

        {/* <div className="center-form">
                <input
                    type="text"
                    className="text-box"
                    name="projectName"
                    onChange={this.onChange}
                    value={projectName}
                />
            </div> */}
    }

}
export default withFirebase(Dashboard);