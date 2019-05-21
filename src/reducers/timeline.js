export const timeline = (state = [], action) => {
    if (action.type === ActionType.LIST) {
        return action.photos;
    }

    if (action.type === ActionType.COMMENT){
        const targetedPhoto = action.photos.find(photo => photo.id === action.id);
        targetedPhoto.comments.push(action.comment);
        return state
    }
    return state;
};

export const ActionType = {
    LIST: "LIST",
    COMMENT: 'COMMENT',
    LIKE: 'LIKE'
};
