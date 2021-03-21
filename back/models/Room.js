const {Schema,model,Types}=require('mongoose')

const schema=new Schema({
    users:[{type:Types.ObjectId,ref:"User",requied:true}],
    chat:{type:Array,requied:true},
    tasks:[{type:Types.ObjectId,ref:"Task",requied:true}],
   todos:[{type:Types.ObjectId,ref:"Todo",requied:true}]
});


module.exports=model('Room',schema)