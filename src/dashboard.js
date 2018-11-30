import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: '',
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {

        this.props.firebase.store.collection("projects").doc("1").onSnapshot(doc => {
            this.setState({
                projectName: doc.data().name,
            })
        });
    }

    onChange = (event) => {
        this.props.firebase.store
            .collection("projects")
            .doc("1")
            .update({
                name: event.target.value
            });
    }

    render() {
        const projectName = this.state.projectName;

        return (
            <div className="center-form">
                <input
                    type="text"
                    className="text-box"
                    name="projectName"
                    onChange={this.onChange}
                    value={projectName}
                />
            </div>
        );
    }

}
export default withFirebase(Dashboard);