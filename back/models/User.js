const {Schema,model,Types}=require('mongoose')



const schema=new Schema({
    email:{type:String,requied:true,unique:true},
    login:{type:String,requied:true,unique:true},
    password:{type:String,requied:true},
    room: {type: Types.ObjectId, ref: 'Room'},
    chatId:{type:String},

});


module.exports=model('User',schema)