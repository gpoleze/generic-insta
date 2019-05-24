import {get, post} from "../../services/webapi";
import {Photo} from "../photo-box/Photo";
import {Liker} from "../photo-box/Liker";
import {Comment} from "../photo-box/Comment";
import {commentAction, likeAction, listAction} from "../../actions/actionCreator";


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
                    dispatch(likeAction(id, liker));
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
                    dispatch(commentAction(id, comment));
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
                    dispatch(listAction(photos));
                    return photos;
                })
        }
    }
}
