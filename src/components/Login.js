import React from "react";
// import {Redirect} from 'react-router-dom';

import {post} from '../services/webapi'

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        const params = new URLSearchParams(props.location.search);
        const msgParam = params.get('msg');
        this.state = {msg: msgParam};
    }

    send(event) {
        event.preventDefault();

        const data = {login: this.login.value, senha: this.password.value};
        const {history} = this.props;

        post("/public/login", data)
            .then(res => res.text())
            .then(token => {
                localStorage.setItem('auth-token', token);
                history.push('/timeline');
            })
            .catch(err => this.setState({msg: 'Not able to login'}));
    }


    render() {
        return (<div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.send.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.password = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}
