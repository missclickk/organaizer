import { combineReducers } from "redux";
import {dateReducer} from './dateReducer';
import {chatReducer} from './chatReducer'
import {renderReducer} from './renderReducer'
import {taskReducer} from './taskReducer'
import {todoReducer} from './todoReducer'
import {userReducer} from './userReducer'
export const rootReducer=combineReducers({
    date: dateReducer,
    chat: chatReducer,
    render:renderReducer,
    task:taskReducer,
    todo:todoReducer,
    user:userReducer
})
