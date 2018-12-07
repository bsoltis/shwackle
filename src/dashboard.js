import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Card, Icon, Container, Header } from 'semantic-ui-react';

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

    addNewProject = (event) => {

    }

    render() {
        const users = this.state.users;

        return (
            <Container style={{marginTop: '7em'}}>
                <Header as="h1" inverted>
                    Welcome to Shwackle
                </Header>
                <Header as="h3" inverted>
                    Manage existing projects or create a new project.
                </Header>
                <Card.Group itemsPerRow={4}>
                    <Card color='red' onClick={this.addNewProject}>
                        <Card.Content textAlign="center">
                            <Icon name="plus circle" size="huge" style={{margin: '1em 0em'}}/>
                            <Card.Header>Add a project</Card.Header>
                            <Card.Description>Click here to ad a new SCRUM project.</Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Container>
        );
    }

}
export default withFirebase(Dashboard);