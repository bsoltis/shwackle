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
                    <div className="ui fixed menu pointing secondary inverted" style={{backgroundColor: '#F15946'}}>
                        <div className="ui container">
                            <Link to="/" className="active item">Home</Link>

                            {this.props.authenticated ? (
                                <div>
                                <Link to="/dashboard" className="item">Dashboard</Link>
                                <div className="right item">
                                    <LogOut className="ui inverted button"/>
                                </div>
                                </div>
                            ) : (
                                <div className="right item">
                                    <Link to="/login" className="ui inverted button">Login</Link>
                                    <Link to="/register" className="ui inverted button" style={{marginLeft: '0.5em'}}>Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route authenticated={this.props.authenticated} path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <ProtectedRoute authenticated={this.props.authenticated} path="/dashboard" component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Navigation;