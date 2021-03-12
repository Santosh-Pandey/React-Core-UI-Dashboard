import React, { Component } from 'react'

export default class Logout extends Component {


    componentDidMount() {
      alert('innn');
        // remove all
        localStorage.clear();
        //window.location.replace("/");
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
