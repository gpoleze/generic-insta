import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PhotoHeader extends Component{
    render() {
        const {info} = this.props;

        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={info.profilePhotoUrl} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${info.userLogin}`}>
                            {info.userLogin}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{info.date}</time>
            </header>
        );
    }
}
