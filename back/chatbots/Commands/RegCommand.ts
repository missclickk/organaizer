import {Command} from './Command'

export class RegCommand implements Command{
    private email:string;
    private password:string;
    private executor:Function; 
    private chatId:string;
    constructor(args:Array<string>,chatId:string,executor:Function){
       this.email=args[0];
     this.password=args[1];
     this.executor=executor;
     this.chatId=chatId;
     }
     execute(){
        
         this.executor(this.email,this.password,this.chatId);
     }
 
 }