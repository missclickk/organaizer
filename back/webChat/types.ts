

export type IRoom={
    clients:Array<Object>;
    chat?:Array<Object>;
    chatBots?:Array<string>;
}

export type SocketCustom={
    socket:any;
    roomId:string;
    id:string;
}


export type reqData={
    roomID:string;
    msg?:string;
    loginUser?:string;
    date?:string;
}
export type resData={
    type:string;
    message:Array<object>;
    clients?:Array<any>;
}

export type response={
    data:resData,
    mode:string
}