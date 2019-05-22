import {get, post} from "../../services/webapi";
import {Photo} from "../photo-box/Photo";
import {Liker} from "../photo-box/Liker";
import {Comment} from "../photo-box/Comment";
import {ActionType} from "../../reducers/timeline";

export default class TimelineAPI {

    /**
     *
     * @param id {number}
     * @returns {Function}
     */
    static like(id) {
        return dispatch => {
            post(
                `/fotos/${id}/like`,
                {},
                localStorage.getItem('auth-token')
            )
                .then(res => res.text())
                .then(JSON.parse)
                .then(liker => new Liker(liker.login))
                .then(liker => {
                    dispatch({type: ActionType.LIKE, id, liker});
                    return liker;
                });
        }
    };

    /**
     *
     * @param id {number}
     * @param commentInput {Object}
     * @returns {Function}
     */
    static comment(id, commentInput) {
        return dispatch => {
            post(
                `/fotos/${id}/comment`,
                {texto: commentInput.value},
                localStorage.getItem('auth-token')
            )
                .then(res => res.text())
                .then(JSON.parse)
                .then(comment => new Comment(comment.id, comment.login, comment.texto))
                .then(comment => {
                    dispatch({type: ActionType.COMMENT, id, comment});
                    return comment;
                });

            commentInput.value = '';
        }
    };

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
}
