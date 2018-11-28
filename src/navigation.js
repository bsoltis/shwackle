import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './home';
import Register from './register';
import LogOut from './logout';

class Navigation extends Component {
    render() {
        return (
            <Router>
              <div className="menu">
                <li>
                    <Link to="/">Home</Link>
                </li>
                
                {this.props.authenticated ? (
                    <span>
                        <Link to="/dashboard">Dashboard</Link>
                        <LogOut />
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
                <Switch>
                    <Route exact path="/" component={Home} />
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