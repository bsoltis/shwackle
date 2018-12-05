import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Card, Segment, Container } from 'semantic-ui-react'; 

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
            <Container >
            <Card style={{marginTop: '3em'}}>
                <Card.Content>
                    <h1>Hello World</h1>
                </Card.Content>
            </Card>
            </Container>
        );
    }

}
export default withFirebase(Dashboard);