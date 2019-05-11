import React from "react";

export default class Logout extends React.Component {
    componentWillMount() {
        if (localStorage.getItem('auth-token'))
            localStorage.removeItem('auth-token');

        const {history} = this.props;
        history.push('/');
    }

    render() {
        return null;
    }
}
