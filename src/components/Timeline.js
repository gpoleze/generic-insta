import React, {Component} from 'react';
import PhotoItem from './photo-box/components/PhotoItem';
import {get} from '../services/webapi'

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {photos: []};
        this.login = this.props.login;
    }

    componentDidMount() {
        this.loadPhotos(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.login !== nextProps.login){
            this.login = nextProps.login;
            this.loadPhotos();
        }
    }

    loadPhotos() {
        const login = this.login;
        const url = !!login ? `/public/fotos/${login}` : `/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        get(url)
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
