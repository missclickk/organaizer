export interface Bot{
    sendMessage(chatId:string,msg:string):void;
    sendKeyboard(chatId:string,msg:string,keyboard:Array<Array<string>>):void;
}