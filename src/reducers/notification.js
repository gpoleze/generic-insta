import {ActionType} from "../actions/ActionType";

export const notification = (state = '', action) => {
    if (action.type === ActionType.ALERT)
        return action.msg;

    return state;
};
