import {get, isUserLogedin, post} from "../../services/webapi";
import PubSub from "pubsub-js";
import {PubSubChannel} from "../../services/pubsub-channels";

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
            .then(liker => {
                const targetedPhoto = this.photos.find(photo => photo.id === id);

                const hasLiker = !!targetedPhoto.likers.find(photosLiker => photosLiker.login === liker.login);

                if (hasLiker)
                    targetedPhoto.likers = targetedPhoto.likers.filter(photosLiker => photosLiker.login !== liker.login);
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
            .then(comment => {
                const targetedPhoto = this.photos.find(photo => photo.id === id);
                targetedPhoto.comentarios.push(comment);
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
            .then(photos => photos.map(photo => {
                const loggedInUser = isUserLogedin(photo.loginUsuario);
                photo.hasLikeByLoggedInUser = photo.likers.includes(loggedInUser);
                return photo;
            }))
            .then(photos => {
                this.photos = photos;
                this.publish({photos});
            });
    }
}
