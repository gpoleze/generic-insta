import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import {timeline} from "../reducers/timeline";
import {notification} from "../reducers/notification";

const reducers = combineReducers({timeline, notification});
export const store = createStore(reducers, applyMiddleware(thunk));
