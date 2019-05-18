import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import PhotoItem from './photo-box/components/PhotoItem';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {photos: []};
        this.login = this.props.login;
    }

    componentDidMount() {
        this.loadPhotos();
        this.props.timelineLogic.subscribe(photos => this.setState({photos}));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.login !== nextProps.login) {
            this.login = nextProps.login;
            this.loadPhotos();
        }
    }

    loadPhotos() {
        const login = this.login;
        const url = !!login ? `/public/fotos/${login}` : `/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        this.props.timelineLogic.listPhotos(url);
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.photos.map(photo =>
                            <PhotoItem
                                key={photo.id}
                                photo={photo}
                                commentAction={(id, commentInput) => this.props.timelineLogic.comment(id, commentInput)}
                                likeAction={id => this.props.timelineLogic.like(id)}
                            />)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
