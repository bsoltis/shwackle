import React from 'react';
import './login.css';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: ""
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form className="center-form card" onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <input type="text" className="text-box" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                <input type="password" className="text-box" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <button className="button" disabled={!this.validateForm()}>Log In</button>
            </form>
        );
    }
}