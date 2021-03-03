const {Schema,model,Types}=require('mongoose');


const schema=new Schema({
    title:{type:String,requied:true,unique:true},
    tasks:{type:Object,default:[]},
    users:{type:Object,requied:true},
    room: {type: Types.ObjectId, ref: 'Room'},
});


module.exports=model('Todo',schema)