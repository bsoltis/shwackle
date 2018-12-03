import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { compose } from 'recompose';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class RegisterBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((user) => {
                // return this.props.firebase.user(user.user.uid).set({
                //     username,
                //     email,
                // });

                this.props.firebase.store.collection("users").add({
                    username,
                    email,
                });
            })
            .then(() => {
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ error: error });
            });
      };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="card center-form">
                <form onSubmit={this.handleSubmit}>
                    <img src={require('./img/logo_transparent_background.png')} width="170" alt="" />
                    <h3>Register</h3>
                    <input
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Full Name"
                        className="text-box"
                    />
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                        className="text-box"
                    />
                    <input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                        className="text-box"
                    />
                    <input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                        className="text-box"
                    />
                    <button type="submit" className="small red button" disabled={isInvalid}>Sign Up</button>
                    { error && <p>{error.message}</p> }
                </form>
            </div>
        );
    }
}

const Register = compose(
    withRouter,
    withFirebase
)(RegisterBase);

export default Register;