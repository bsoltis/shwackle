import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: null,
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
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
            <div className="card center-form">
                <form onSubmit={this.handleSubmit}>
                    <img src={require('./img/logo_transparent_background.png')} width="170" />
                    <h3>Log In</h3>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleInputChange} 
                        className="text-box"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleInputChange}
                        className="text-box"
                    />
                    <button type="submit" className="small red button" disabled={isInvalid}>Log In</button>
                </form>
           </div>
        );
    }
}
export default withRouter(Login);