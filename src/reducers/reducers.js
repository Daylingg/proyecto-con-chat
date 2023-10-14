import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { chatReducer, messageReducer } from "./chatReducer";
import { notesReducer } from "./notesReducer";
import { uiReducer } from "./uiReducer";

export const reducers = combineReducers({ 
    auth:authReducer,
    ui:uiReducer,
    chat:chatReducer,
    msg:messageReducer,
    notes:notesReducer
})