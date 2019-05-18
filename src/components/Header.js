import React, {Component} from 'react';

export default class Header extends Component {

    _search(event) {
        event.preventDefault();

        const inputValue = this._searchInput.value.trim();

        if (!inputValue){
            this._searchInput.value = "";
            return;
        }

        this.props.timelineLogic.listPhotos(`/public/fotos/${inputValue}`);
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
                        className="header-busca-campo"
                        ref={input => this._searchInput = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
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
