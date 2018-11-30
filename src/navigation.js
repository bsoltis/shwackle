import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './home';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedroute';
import LogOut from './logout';

class Navigation extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="menu">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            {this.props.authenticated ? (
                                <span>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <LogOut />
                                    </li>
                                </span>
                            ) : (
                                <span>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </span>
                            )}
                        </ul>
                    </div>
                    <Switch>
                        {/* <Route exact path="/" component={Home} /> */}
                        {/* <Route authenticated={this.props.authenticated} path="/login" component={Login} /> */}
                        <Route path="/register" component={Register} />
                        {/* <ProtectedRoute authenticated={this.props.authenticated} path="/dashboard" component={Dashboard} /> */}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Navigation;