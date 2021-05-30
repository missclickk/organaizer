import {Command} from './Command'
import {CommandFactory} from './CommandFactory'
import {ReqValidator} from './../../classes/ReqValidator'

//title users room
export function CreateToDoWrapper(room:string,title:string,usersList:string[],users:string[]):Command{
let obj={};
usersList.forEach(e=>  users.includes(e)?obj[e]=true : obj[e]=false);
const args=[room,title,JSON.stringify(users)];
    let factory=new CommandFactory();
    return  factory.createCommand("create_todo_sec",args);
}



export class CreatTodoCommand implements Command{
    private room:string;
    private title:string;
    private users:{};
    private validator:ReqValidator;
    private resurce:any
    constructor(args:Array<string>,resurce,validator:ReqValidator){
        this.room=args[0];
        this.title=args[1];
        this.users=JSON.parse(args[2]);
        this.validator=validator;
        this.resurce=resurce;
    }


    async   execute(){
           await this.resurce.addItem({title:this.title,users:this.users},this.room);
    }
}
