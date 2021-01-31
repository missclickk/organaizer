


const initialState={
        loginUser:null,
        usersGroup:[]
}


export const userReducer=(state=initialState,action)=>{

    switch (action.type) {
        case LOG_IN_OUT_USER:
            return {...state,loginUser:action.payload}
        default:
            break;
    }
}