import React, {Component} from 'react';

import PhotoUpdate from "./PhotoUpdate";
import PhotoInfo from "./PhotoInfo";
import PhotoHeader from "./PhotoHeader";

export default class PhotoItem extends Component {
    render() {
        return (
            <div className="foto">
                <PhotoHeader info={this.props.photo.headerInfo}/>
                <img alt="foto" className="foto-src" src={this.props.photo.photoUrl}/>
                <PhotoInfo photo={this.props.photo}/>
                <PhotoUpdate {...this.props}/>
            </div>
        );
    }
}
