import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk'; // Import thunk correctly
import { userReducers } from "./reducers/userReducers";

const rootReducers = combineReducers({
    user: userReducers
});

export const store = createStore(rootReducers, {}, applyMiddleware(thunk));
