export const ActionType = {
    LIST: "LIST",
    COMMENT: 'COMMENT',
    LIKE: 'LIKE'
};

export const timeline = (state = [], action) => {
    if (action.type === ActionType.LIST) {
        return action.photos;
    }

    if (action.type === ActionType.COMMENT){

        const photos = [].concat(state);

        const targetedPhoto = photos.find(photo => photo.id === action.id);
        targetedPhoto.comments.push(action.comment);

        return photos
    }

    if (action.type === ActionType.LIKE){
        const photos = [].concat(state);
        const {id, liker} = action;

        const targetedPhoto = photos.find(photo => photo.id === id);

        const hasLiker = !!targetedPhoto.likers.find(photosLiker => photosLiker.userLogin === liker.userLogin);

        if (hasLiker)
            targetedPhoto.likers = targetedPhoto.likers.filter(photosLiker => photosLiker.userLogin !== liker.userLogin);
        else
            targetedPhoto.likers.push(liker);

        targetedPhoto.hasLikeByLoggedInUser = !targetedPhoto.hasLikeByLoggedInUser;

        return photos
    }
    return state;
};
