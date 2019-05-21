import {get, post} from "../../services/webapi";
import PubSub from "pubsub-js";
import {PubSubChannel} from "../../services/pubsub-channels";
import {Photo} from "../photo-box/Photo";
import {Liker} from "../photo-box/Liker";
import {Comment} from "../photo-box/Comment";
import {ActionType} from "../../reducers/timeline";

export default class TimelineAPI {
    constructor(photos = []) {
        this.photos = photos;
    }

    like(id) {
        post(
            `/fotos/${id}/like`,
            {},
            localStorage.getItem('auth-token')
        )
            .then(res => res.text())
            .then(JSON.parse)
            .then(liker => new Liker(liker.login))
            .then(liker => {
                const targetedPhoto = this.photos.find(photo => photo.id === id);

                const hasLiker = !!targetedPhoto.likers.find(photosLiker => photosLiker.userLogin === liker.userLogin);

                if (hasLiker)
                    targetedPhoto.likers = targetedPhoto.likers.filter(photosLiker => photosLiker.userLogin !== liker.userLogin);
                else
                    targetedPhoto.likers.push(liker);

                targetedPhoto.hasLikeByLoggedInUser = !targetedPhoto.hasLikeByLoggedInUser;

                this.publish({photos: this.photos});
            });
    };

    comment(id, commentInput) {
        post(
            `/fotos/${id}/comment`,
            {texto: commentInput.value},
            localStorage.getItem('auth-token')
        )
            .then(res => res.text())
            .then(JSON.parse)
            .then(comment => new Comment(comment.id, comment.login, comment.texto))
            .then(comment => {

            });

        commentInput.value = '';
    };

    DEPRECATED_publish(data) {
        PubSub.publish(PubSubChannel.TIMELINE, data);
    }

    static subscribe(callback) {
        PubSub.subscribe(PubSubChannel.TIMELINE, (topic, message) => callback(message.photos));
    }

    /**
     * @param url {string}
     * @returns {Function}
     */
    static listPhotos(url) {
        return dispatch => {
            get(url)
                .then(photos => photos.map(photo => new Photo(photo)))
                .then(photos => {
                    dispatch({type: ActionType.LIST, photos});
                    return photos;
                })
        }
    }

    static _publish(data, store) {
        store.dispatch({type: ActionType.LIST, data})
    }
}
