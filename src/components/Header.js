import React, {Component} from 'react';
import TimelineAPI from "./logic/TimelineAPI";

export default class Header extends Component {

    constructor() {
        super();
        this.state = {errorMessage: ''};
    }

    componentDidMount() {
        this.props.store.subscribe(() =>{
            console.log(this.props.store.getState());
            this.setState({errorMessage: this.props.store.getState().header});

            this._searchInput.focus();
        });
    }

    _search(event) {
        event.preventDefault();

        const inputValue = this._searchInput.value.trim();

        if (inputValue)
            this.props.store.dispatch(TimelineAPI.search(inputValue));

        this._searchInput.value = "";
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
                        className={`header-busca-campo ${this.state.errorMessage ? 'input-error' : ''}`}
                        ref={input => this._searchInput = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                <span>{this.state.errorMessage}</span>
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
