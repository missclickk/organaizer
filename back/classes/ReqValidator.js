class ReqValidator{ 
    #rules={
        login:(val)=>{
           if(val.length==0)
            return 1
            else  return true
        },
        password:(val)=>{
            if(val.length<5)
            return 2
            else return true
        },
        rPassword:(val,val1)=>{
            if(val!=val1)
            return 3
            else return true
        },
        email:(val)=>{
            const reg=new RegExp("\\w+@\\w+.\\w+" ,'g');
            const result=val.match(reg);
            if(result!==null && result[0].length==val.length)
            return true;
            else
            return 4;
        }
    }
    constructor(){ }
    validate(obj){
    const result=[];    
    for(const item in obj)
        {
            result.push(this.#rules[item](obj[item]));
        }
        return result;
    }

}

module.exports={reqValidator:new ReqValidator()}