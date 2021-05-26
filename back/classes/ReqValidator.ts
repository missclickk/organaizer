enum ErrorCod{
    SMALL_LOGIN=1,
    SMALL_PASSWORD,
    PASSWORD_MISMATCH,
    WRONG_EMAIL
}
const VALIDATION_SUCCESSFUL:boolean=true;
export class ReqValidator{
private rules:{login:Function,password:Function,rPassword:Function,email:Function}={
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
     }
}
constructor(){ }
    validate(obj:{login?:string,password?:string,rPassword?:string,email?:string}):Array<number|boolean>{
    const result:Array<number|boolean>=[];    
    for(const item in obj)
        {
            result.push( item==="rPassword"?this.rules[item](obj.rPassword,obj.password):this.rules[item](obj[item]));
        }
        return result;
    }
}

export const  reqValidator=new ReqValidator();