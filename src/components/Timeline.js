import React, {Component} from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import PhotoItem from './photo-box/components/PhotoItem';
import TimelineAPI from "./logic/TimelineAPI";

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {photos: []};
        this.login = this.props.login;
    }

    componentDidMount() {
        this.loadPhotos();
    }

    componentWillMount() {
        this.props.store.subscribe(() => this.setState({photos: this.props.store.getState().timeline}));
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

        this.props.store.dispatch(TimelineAPI.listPhotos(url));
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.photos.map(photo =>
                            <PhotoItem
                                key={photo.id}
                                photo={photo}
                                commentAction={(id, commentInput) => this.props.store.dispatch(TimelineAPI.comment(id, commentInput))}
                                likeAction={id => this.props.store.dispatch(TimelineAPI.like(id))}
                            />
                        )
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}
