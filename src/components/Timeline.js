import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group'

import PhotoItem from './photo-box/components/PhotoItem';
import TimelineAPI from "./logic/TimelineAPI";
import {connect} from "react-redux";

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = this.props.login;
    }

    componentDidMount() {
        this.loadPhotos();
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

        this.props.listPhotos(url);
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.props.photos.map(photo =>
                            <PhotoItem
                                key={photo.id}
                                photo={photo}
                                commentAction={this.props.comment}
                                likeAction={this.props.like}
                            />
                        )
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        photos: state.timeline
    }
};
const mapDispatchToProps = dispatch => {
    return {
        listPhotos: url => dispatch(TimelineAPI.listPhotos(url)),
        like: photoId => dispatch(TimelineAPI.like(photoId)),
        comment: (photoId, commentInput) => dispatch(TimelineAPI.comment(photoId, commentInput))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
