import { combineReducers } from "redux";
import {dateReducer} from './dateReducer';
import {chatReducer} from './chatReducer'
export const rootReducer=combineReducers({
    date: dateReducer,
    chat: chatReducer
})
