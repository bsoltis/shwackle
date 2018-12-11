import React, { Component } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

class DeleteProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteConfirmation: '',
            modalOpen: this.props.modalOpen,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                modalOpen: nextProps.modalOpen,
            });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOpen = () => {
        this.setState({}, () => this.ref.focus() );
    }

    handleClose = () => {
        this.setState({
            modalOpen: false,
        });
    }

    deleteProject = () => {

    }

    handleRef = component => (this.ref = component);

    render() {
        const isInvalid = this.state.deleteConfirmation != 'DELETE';

        return (
            <Modal open={this.state.modalOpen} size='small' onClose={this.handleClose} onOpen={this.handleOpen} basic>
                <Modal.Header>Are you sure you want to delete?</Modal.Header>
                <Modal.Content>
                    <p>This cannot be undone. Type DELETE below and click Delete if you want to proceed.</p>
                    <Input placeholder="DELETE" fluid onChange={this.handleChange} name='deleteConfirmation' ref={this.handleRef} />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='grey' onClick={this.handleClose}>
                        <Icon name='cancel' inverted/> Cancel
                    </Button>
                    <Button color='red' onClick={this.deleteProject} disabled={isInvalid}>
                        <Icon name='trash' /> Delete
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteProjectModal;