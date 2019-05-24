import {List} from "immutable";
import {Photo} from "../components/photo-box/Photo";


export const ActionType = {
    LIST: "LIST",
    COMMENT: 'COMMENT',
    LIKE: 'LIKE'
};

const changePhoto = (photos, id, updateCallback) => {
    const oldPhotoState = photos.find(photo => photo.id === id);

    const newPhotosState = new Photo(oldPhotoState).update(updateCallback(oldPhotoState));
    const listIndex = photos.findIndex(photo => photo.id === id);
    return photos.set(listIndex, newPhotosState);
};

export const timeline = (state = [], action) => {
    if (action.type === ActionType.LIST) {
        return new List(action.photos);
    }

    if (action.type === ActionType.COMMENT) {
        return changePhoto(state, action.id, oldPhotoState => {
            const newComments = oldPhotoState.comments.concat(action.comment);
            return {comments: newComments};
        });
    }

    if (action.type === ActionType.LIKE) {
        return changePhoto(state, action.id, oldPhotoState => {
            const hasLikeByLoggedInUser = !oldPhotoState.hasLikeByLoggedInUser;

            const hasLiker = !!oldPhotoState.likers.find(photosLiker => photosLiker.userLogin === action.liker.userLogin);

            const newLikers = hasLiker
                ? oldPhotoState.likers.filter(photosLiker => photosLiker.userLogin !== action.liker.userLogin)
                : oldPhotoState.likers.concat(action.liker);

            return {hasLikeByLoggedInUser: hasLikeByLoggedInUser, likers: newLikers};
        });
    }
    return state;
};
