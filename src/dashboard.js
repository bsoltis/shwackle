import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Card, Segment, Container, Header } from 'semantic-ui-react';

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
            <Segment
                textAlign='center'
                style={{ minHeight: 400, padding: '1em 0em', backgroundColor: '#2B2D42' }}
                vertical>
            <Container style={{marginTop: '3em'}}>
            <Header as="h1" inverted>
                Welcome to Shwackle
            </Header>
            <Card style={{marginTop: '5em'}}>
                <Card.Content>
                    <h1>Add a project</h1>
                </Card.Content>
            </Card>
            </Container>

          </Segment>
        );
    }

}
export default withFirebase(Dashboard);