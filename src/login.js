import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import { Button, Form, Grid, Image, Message, Segment } from 'semantic-ui-react'

class LoginBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null,
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form onSubmit={this.handleSubmit} size='large'>
                            <Segment stacked>
                                <Image src={require('./img/logo_transparent_background.png')} height="60" centered={true} />

                                <Form.Input 
                                    fluid 
                                    icon='user' 
                                    iconPosition='left' 
                                    placeholder='E-mail'
                                    name="email"
                                    value={email}
                                    onChange={this.handleInputChange}
                                />

                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    name="password"
                                    value={password}
                                    type='password'
                                    onChange={this.handleInputChange}
                                />

                                <Button color='red' fluid size='large' disabled={isInvalid}>
                                    Log In
                                </Button>
                                <Message negative hidden={!error}>
                                    { error && <p>{error.message}</p> }
                                </Message>
                            </Segment>
                        </Form>
                        <Message>
                            Need an account? <Link to="/register">Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>           
        );
    }
}

const Login = compose(
    withRouter,
    withFirebase
)(LoginBase);

export default Login;