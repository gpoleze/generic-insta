import React, {Component} from 'react';
import TimelineAPI from "./logic/TimelineAPI";
import {connect} from "react-redux";

class Header extends Component {

    _search(event) {
        event.preventDefault();

        const input = this._searchInput;

        if (input.value.trim())
            this.props.search(input.value.trim());

        input.value = "";
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form className="header-busca" onSubmit={event => this._search(event)}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        className={`header-busca-campo ${this.props.errorMessage ? 'input-error' : ''}`}
                        ref={input => this._searchInput = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                <span>{this.props.errorMessage}</span>
                </form>


                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                                ♡
                                {/*                 ♥ */}
                                {/* Quem deu like nas minhas fotos */}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.notification
    }
};
const mapDispatchToProps = dispatch => {
    return {
        search: inputValue => dispatch(TimelineAPI.search(inputValue))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
