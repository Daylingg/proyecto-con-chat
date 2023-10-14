import { types } from '../types/types';

const initialState = {
    chatId: "null",
    user: {},
  };

export const chatReducer = (state =initialState , action) => {

    switch (action.type) {
        case types.chatNew:
            return{
                ...state,
                chatId:action.payload.uid,
                user:action.payload.user.infoUser
            }

        
    
        default:
            return state
    }
}


const initialMsg={
    chatId:null,
    message:[]
}

export const messageReducer=(state=initialMsg,action)=>{

    switch (action.type) {
        case types.msgUpdate:
            return{
                ...state,
                chatId:action.payload.uid,
                message:[
                    ...state.message,action.payload.messages
                ]
            }

        
    
        default:
            return state;
    }
}