import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Modal, Button, Icon, Form } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

class DeleteProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteConfirmation: '',
            modalOpen: this.props.modalOpen,
            projectId: this.props.projectId,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                deleteConfirmation: '',
                modalOpen: nextProps.modalOpen,
                projectId: nextProps.projectId,
            });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    deleteProject = (event) => {
        event.preventDefault();
        const projectId = this.state.projectId;
        this.props.onClose();

        this.props.firebase.store.collection("projects").doc(projectId).delete().then(() => {
            toast({
                type: 'success',
                description: 'Project deleted',
                time: 2000
            });
        }).catch(function(error) {
            toast({
                type: 'success',
                description: 'Error deleting project',
                time: 2000
            });
        });
    }

    render() {
        const isInvalid = this.state.deleteConfirmation !== 'DELETE';

        return (
            <div>
                <Modal open={this.state.modalOpen} size='small' onClose={this.props.onClose} basic>
                    <Modal.Header>Are you sure you want to delete?</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.deleteProject} id='deleteProjectForm'>
                            <p>This cannot be undone. Type DELETE below and click Delete if you want to proceed.</p>
                            <Form.Input placeholder="DELETE" fluid onChange={this.handleChange} name='deleteConfirmation' autoFocus />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='grey' onClick={this.props.onClose}>
                            <Icon name='cancel' inverted/> Cancel
                        </Button>
                        <Button type='submit' form='deleteProjectForm' color='red' disabled={isInvalid}>
                            <Icon name='trash' /> Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
                <SemanticToastContainer position='bottom-right' />
            </div>
        );
    }
}

export default withFirebase(DeleteProjectModal);