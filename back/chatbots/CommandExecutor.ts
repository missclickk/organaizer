import {CommandFactory} from './Commands/CommandFactory'
import {Command} from './Commands/Command'
import {CommandResponse} from './t_bot'
 export  class CommandExecutor{
    private factory:CommandFactory;

    constructor(factory:CommandFactory){
        this.factory=factory;
    }
    private createCommand(type: string, args: Array<string>, id: string, date: string): Command {
        return this.factory.createCommand(type, args, id, date);
    }
    private async commandExecute(com:Command,id:string):Promise<boolean|CommandResponse>{
        const res =await com.execute();
        if( res!==undefined)   
                return {fn:(res as {wrapper}).wrapper,chatId:id,commandType:(res as {commandType}).commandType};
            return true;  
    
    }
   async   getCommandResult(type: string, args: Array<string>, id: string, date: string):Promise<boolean|CommandResponse>{
                let com:Command=this.createCommand(type,args,id,date);
                return await  this.commandExecute(com,id);

        };
}