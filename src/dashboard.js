import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';
import { withAuthentication } from './Session';
import { Card, Icon, Container, Header, Modal, Input, Button } from 'semantic-ui-react';

class Dashboard extends Component {
    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <DashboardBase {...this.props} authUser={authUser} />
                )}
            </AuthUserContext.Consumer>
        );
    }  
};

class DashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            modalOpen: false,
            projectName: '',
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this.props.firebase.store
            .collection("projects").where("owner", "==", this.props.authUser.uid).onSnapshot(snapshot => {

                var projs = [];
                snapshot.forEach(function(doc) {
                    var project = {id: doc.id, data: doc.data()};
                    projs.push(project);
                });

                this.setState({
                    projects: projs,
                });
            });
    }

    addNewProject = (event) => {
        this.setState(
            {modalOpen: true},
            () => this.ref.focus()
        );
    }

    handleClose = () => {
        this.setState({
            modalOpen: false,
        });
    }

    handleProjectNameChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateProjectClick = () => {
        const name = this.state.projectName;
        const user = this.props.authUser;

        this.props.firebase.store
            .collection("projects")
            .add({
                name: name,
                owner: user.uid,
            });

        this.setState({
            modalOpen: false,
        });
    }

    handleRef = component => (this.ref = component);

    render() {
        const projects = this.state.projects;

        const modalDisabled = this.state.projectName === '';

        return (
                <Container style={{marginTop: '7em'}}>
                    <Header as="h1" inverted>
                        Welcome to Shwackle
                    </Header>
                    <Header as="h3" inverted >
                        Manage existing projects or create a new project.
                    </Header>
                    <Card.Group itemsPerRow={4} className='project-cards' stackable>
                        <Card color='red' onClick={this.addNewProject}>
                            <Card.Content textAlign="center">
                                <Icon name="plus circle" size="huge" style={{margin: '0.6em 0em'}}/>
                                <Card.Header>Add a project</Card.Header>
                                <Card.Description>Click here to add a new SCRUM project.</Card.Description>
                            </Card.Content>
                        </Card>
                        {projects.map(project => (
                            <Card color='red' key={project.id}>
                                <Card.Content textAlign="center">
                                    <Card.Header>{project.data.name}</Card.Header>
                                    <Card.Description></Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                    <Modal open={this.state.modalOpen} size='small' onClose={this.handleClose}>
                        <Modal.Header>Add a new project</Modal.Header>
                        <Modal.Content>
                            <Input placeholder="Project Name" fluid onChange={this.handleProjectNameChange} name='projectName' ref={this.handleRef} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={this.handleCreateProjectClick} disabled={modalDisabled}>
                                <Icon name='checkmark' /> Create
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Container>

        );
    }

}
export default withAuthentication(Dashboard);