import {Command} from './Command'
import {CommandFactory} from './CommandFactory'
import {ReqValidator} from './../../classes/ReqValidator'
import {TaskResurce} from './../../resurce/task.resurce'
//title users room
export function CreateTaskWrapper(room:string,title:string,usersList:string[],args:Array<string>):Command{
    let users=args.splice(4);
    let obj={};
usersList.forEach(e=>  users.includes(e)?obj[e]=true : obj[e]=false);
    let period:string;    
switch(args[3]) {
    case "никогда":
        period="never";
        break;
        case "каждый день":
        period="day";
        break;
    case "каждую неделю ":
        period="week";
        break;
    case "каждый месяц":
        period="month";
        break;
    case "каждый год":
        period="year";
        break;
        default: break;
    }
    const task={title, description:args[0],date:args[1],time:args[2],period,users:obj};
    let factory=new CommandFactory();
    return  factory.createCommand("create_task_sec",[room,JSON.stringify(task)]);
}



export class CreateTaskCommand implements Command{
    private room:string;
    private task;
    private validator:ReqValidator;
    private resurce:TaskResurce
    constructor(args:Array<string>,resurce:TaskResurce,validator:ReqValidator){
        console.log(args);
        this.room=args[0];
        this.task=JSON.parse(args[1]);
        this.validator=validator;
        this.resurce=resurce;
    }


    async   execute(){
           await this.resurce.addItem(this.task,this.room)
    }
}
