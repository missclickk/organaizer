import * as moment from 'moment';
enum ErrorCod{
    WRONG_DATA=1,
    SMALL_LOGIN,
    SMALL_PASSWORD,
    PASSWORD_MISMATCH,
    WRONG_EMAIL,
    WRONG_TITLE,
    WRONG_DATE,
    WRONG_TIME,
    WRONG_USERS,
    WRONG_DATA_OVERFLOW
}
const VALIDATION_SUCCESSFUL:boolean=true;
export class ReqValidator{
private rules:{login:Function,password:Function,rPassword:Function,email:Function,title:Function,date:Function,time:Function,users:Function}={
    login:(val:string):boolean|number=>{
        if(val.length<=0)
         return ErrorCod.SMALL_LOGIN;
         else  return VALIDATION_SUCCESSFUL;
     },
     password:(val:string):boolean|number=>{
         if(val.length<5)
         return ErrorCod.SMALL_PASSWORD;
         else return VALIDATION_SUCCESSFUL;
     },
     rPassword:(val:string,val1:string):boolean|number=>{

         if(val!=val1)
         return ErrorCod.PASSWORD_MISMATCH;
         else return VALIDATION_SUCCESSFUL;
     },
     email:(val:string):boolean|number=>{
         const reg:RegExp=new RegExp("\\w+@\\w+.\\w+" ,'g');
         const result=val.match(reg);
         if(result!==null && result[0].length==val.length)
         return VALIDATION_SUCCESSFUL;
         else
         return ErrorCod.WRONG_EMAIL;
     },
     title:(val:string):boolean|number=>{
         console.log(val);
        return    val.length>=1? VALIDATION_SUCCESSFUL:ErrorCod.WRONG_TITLE ;
        
     },
     date:(val:string):boolean|number=>{
        if(val.length==0)
        return ErrorCod.WRONG_DATE
        const currentDate=moment().valueOf();
        const compareDate=moment(val).hour(moment().hour()+1).valueOf();
        return    currentDate<=compareDate? VALIDATION_SUCCESSFUL:ErrorCod.WRONG_DATE ;
        
     },
     time:(val:string):boolean|number=>{
        return val.length==0? ErrorCod.WRONG_TIME: VALIDATION_SUCCESSFUL;
     },
     users:(val:any):boolean|number=>{
        for(const user in val)
            if(val[user]===true)
            return VALIDATION_SUCCESSFUL;
        return ErrorCod.WRONG_USERS;    
     }
}
constructor(){ }
    validate(obj:{login?:string,password?:string,rPassword?:string,email?:string,title?:string,date?:string,time?:string,users?:string}):Array<number|boolean>{
    const result:Array<number|boolean>=[];    
    for(const item in obj)
        {
            result.push( item==="rPassword"?this.rules[item](obj.rPassword,obj.password):this.rules[item](obj[item]));
        }
        console.log(result)
        return result;
    }

    
    
}

export const  reqValidator=new ReqValidator();