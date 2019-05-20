import {get, post} from "../../services/webapi";
import PubSub from "pubsub-js";
import {PubSubChannel} from "../../services/pubsub-channels";
import {Photo} from "../photo-box/Photo";
import {Liker} from "../photo-box/Liker";
import {Comment} from "../photo-box/Comment";

export default class TimelineStore {
    constructor(photos) {
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
                const targetedPhoto = this.photos.find(photo => photo.id === id);
                targetedPhoto.comments.push(comment);
                this.publish({photos: this.photos});
            });

        commentInput.value = '';
    };

    publish(data) {
        PubSub.publish(PubSubChannel.TIMELINE, data);
    }

    subscribe(callback) {
        PubSub.subscribe(PubSubChannel.TIMELINE, (topic, message) => callback(message.photos));
    }

    listPhotos(url) {
        get(url)
            .then(photos => photos.map(photo => new Photo(photo)))
            .then(photos => {
                this.photos = photos;
                this.publish({photos});
            });
    }
}
