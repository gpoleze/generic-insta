import {ActionType} from "./ActionType";

export const listAction = (photos) => {
    return {type: ActionType.LIST, photos}
};

export const likeAction = (id, liker) => {
    return {type: ActionType.LIKE, id, liker}
};

export const commentAction = (id, comment) => {
    return {type: ActionType.COMMENT, id, comment}
};

export const alertAction = (msg) => {
    return {type: ActionType.ALERT, msg}
};
