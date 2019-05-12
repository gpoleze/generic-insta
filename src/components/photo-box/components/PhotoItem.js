import React, {Component} from 'react';

import {Photo} from "../Photo";
import PhotoUpdate from "./PhotoUpdate";
import PhotoInfo from "./PhotoInfo";
import PhotoHeader from "./PhotoHeader";

export default class PhotoItem extends Component {
    render() {
        const photo = new Photo(this.props.photo);

        return (
            <div className="foto">
                <PhotoHeader info={photo.headerInfo}/>
                <img alt="foto" className="foto-src" src={photo.photoUrl}/>
                <PhotoInfo photo={photo} />
                <PhotoUpdate photo={photo}/>
            </div>
        );
    }
}
