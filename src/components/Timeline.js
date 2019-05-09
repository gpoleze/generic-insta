import React, {Component} from 'react';
import PhotoItem from './PhotoItem';
import {get} from '../services/webapi'

export default class Timeline extends Component {
    constructor() {
        super();
        this.state = {photos: []};
    }

    componentDidMount() {
        get('/public/fotos/vitor')
            .then(photos => this.setState({photos: photos}));
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo}/>)
                }
            </div>
        );
    }
}
