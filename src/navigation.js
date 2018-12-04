import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Menu, Button, Container } from 'semantic-ui-react';

import Home from './home';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedroute';
import LogOut from './logout';

class Navigation extends Component {
    state = { activeItem: 'home' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Router>
                <div>
                    <Menu secondary pointing inverted fixed='top' style={{backgroundColor: '#F15946'}}>
                        {this.props.authenticated ? (
                            <Container>
                                <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                                    Home
                                </Menu.Item>
                                <Menu.Item as={Link} to="/dashboard" name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}>
                                    Dashboard
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <LogOut />
                                </Menu.Item>
                            </Container>
                        ) : (
                            <Container>
                                <Menu.Item as={Link} to="/" active>
                                    Home
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as={Link} to="/login" inverted>
                                        Log In
                                    </Button>
                                    <Button as={Link} to="/register" inverted style={{marginLeft: '0.5em'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Container>
                        )}
                    </Menu>
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