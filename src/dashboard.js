import React, { Component } from 'react';
import { AuthUserContext } from './Session';
import { withAuthentication } from './Session';
import DeleteProjectModal from './deleteproject';
import { Card, Icon, Container, Header, Modal, Grid, Button, Form, Popup } from 'semantic-ui-react';

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
            addProjectModalOpen: false,
            deleteProjectModalOpen: false,
            projectName: '',
            deleteProjectId: null,
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
        this.setState({
            addProjectModalOpen: true
        });
    }

    handleAddProjectModalClose = () => {
        this.setState({
            addProjectModalOpen: false,
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
            addProjectModalOpen: false,
        });
    }

    handleDeleteProjectModalOpen = (id) => {
        this.setState({
            deleteProjectModalOpen: true,
            deleteProjectId: id,
        });
    }

    handleDeleteProjectModalClose = () => {
        this.setState({
            deleteProjectModalOpen: false,
        });
    }

    render() {
        const projects = this.state.projects;
        const modalDisabled = this.state.projectName === '';

        return (
            <Container style={{marginTop: '7em'}}>
                <Header as="h1" inverted>
                    Welcome to Shwackle
                </Header>
                <Header as="h3" inverted>
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
                                <Card.Description>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Popup trigger={<Button color='green' icon='dashboard' basic fluid size='massive'/>} content='Dashboard' />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Popup trigger={<Button color='blue' icon='th' basic fluid size='massive'/>} content='Boards' />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column>
                                            <Popup trigger={<Button color='red' icon='pie graph' basic fluid size='massive'/>} content='Analytics' />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Popup trigger={<Button color='yellow' icon='users' basic fluid size='massive'/>} content='Manage Users' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button icon='trash' basic style={{float: 'right'}} onClick={() => this.handleDeleteProjectModalOpen(project.id)}/>
                                <Button icon='setting' basic style={{float: 'right'}} />
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
                <Modal open={this.state.addProjectModalOpen} size='small' onClose={this.handleAddProjectModalClose}>
                    <Modal.Header>Add a new project</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleCreateProjectClick} id='addProjectForm'>
                            <Form.Input placeholder="Project Name" fluid onChange={this.handleProjectNameChange} name='projectName' autoFocus />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type='submit' form='addProjectForm' color='green' disabled={modalDisabled}>
                            <Icon name='checkmark' /> Create
                        </Button>
                    </Modal.Actions>
                </Modal>
                <DeleteProjectModal modalOpen={this.state.deleteProjectModalOpen} projectId={this.state.deleteProjectId} onClose={this.handleDeleteProjectModalClose} />
            </Container>
        );
    }
}
export default withAuthentication(Dashboard);