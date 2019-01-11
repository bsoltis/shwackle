import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Modal, Button, Form, Input, Table, Select, Icon} from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

class ManageUsersModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inviteEmail: '',
            teamRole: '',
            modalOpen: this.props.modalOpen,
            projectId: this.props.projectId,
            authUser: this.props.authUser,
            team: [],
        }
    }

    handleOpen = () => {
        this.props.firebase.store
        .collection("projects").doc(this.state.projectId).collection('team').onSnapshot(snapshot => {

            var team = [];
            snapshot.forEach(function(doc) {
                team.push(doc.data());
            });

            this.setState({
                team: team,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                inviteEmail: '',
                teamRole: '',
                modalOpen: nextProps.modalOpen,
                projectId: nextProps.projectId,
                authUser: nextProps.authUser,
                team: [],
            });
            
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    inviteUser = (event) => {
        event.preventDefault();
        const { projectId, inviteEmail, teamRole } = this.state;
        let data = { email: inviteEmail, role: teamRole };
        this.props.firebase.store.collection('users').where("email", "==", inviteEmail).get().then(querySnapshot => {
            if (querySnapshot.docs.length === 1) {
                data.user = querySnapshot.docs[0].ref;
            }
            this.props.firebase.store.collection('projects').doc(projectId).collection('team').add(data);
            this.props.onClose();

            toast({
                type: 'success',
                description: 'Invite sent',
                time: 2000
            });
        });
    }

    render() {
        const isInvalid = this.state.inviteEmail === '' || this.state.teamRole === 'default';

        const roleOptions = [
            { key: 'default', text: 'Choose Role', value: 'default' },
            { key: 'scrum_master', text: 'Scrum Master', value: 'scrum_master' },
            { key: 'product_owner', text: 'Product Owner', value: 'product_owner' },
            { key: 'scrum_team', text: 'Scrum Team', value: 'scrum_team' },
        ];

        return (
            <div>
                <Modal open={this.state.modalOpen} size='small' onClose={this.props.onClose} onOpen={this.handleOpen}>
                    <Modal.Header>Manage Team</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.inviteUser}>
                            <Table celled>
                                <Table.Header fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Role</Table.HeaderCell>
                                    <Table.HeaderCell>E-mail address</Table.HeaderCell>
                                    <Table.HeaderCell>Remove</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                <Table.Row>
                                    <Table.Cell>John Lilki</Table.Cell>
                                    <Table.Cell>Scrum Master</Table.Cell>
                                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                    <Table.Cell><Button icon='remove' color='red' size='mini' /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Jamie Harington</Table.Cell>
                                    <Table.Cell>Product Owner</Table.Cell>
                                    <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                                    <Table.Cell><Button icon='remove' color='red' size='mini' /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Jill Lewis</Table.Cell>
                                    <Table.Cell>Developer</Table.Cell>
                                    <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                                    <Table.Cell><Button icon='remove' color='red' size='mini' /></Table.Cell>
                                </Table.Row>
                                </Table.Body>

                                <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>
                                        <p>Enter an email address to invite someone to your project.</p>
                                        
                                            <Input type='text' placeholder="Email" fluid action
                                                labelPosition='right'
                                                onChange={this.handleChange} 
                                                name='inviteEmail' 
                                                autoFocus>
                                                <input />
                                                <Select 
                                                    compact
                                                    options={roleOptions}
                                                    defaultValue='default' 
                                                    onChange={this.handleChange}
                                                    name='teamRole'
                                                />
                                                <Button type='submit' disabled={isInvalid} primary><Icon name='users' /> Invite</Button>
                                            </Input>
                                    </Table.HeaderCell>
                                </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default withFirebase(ManageUsersModal);