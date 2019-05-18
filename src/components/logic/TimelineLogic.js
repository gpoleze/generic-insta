import {post} from "../../services/webapi";
import PubSub from "pubsub-js";
import {PubSubChannel} from "../../services/pubsub-channels";

export default class TimelineLogic {
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

                PubSub.publish(PubSubChannel.TIMELINE, {photos: this.photos});
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
                PubSub.publish(PubSubChannel.TIMELINE, {photos: this.photos});
            });

        commentInput.value = '';
    };
}
