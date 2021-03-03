const {Schema,model,Types}=require('mongoose')
const schema=new Schema({
    title:{type:String,requied:true},
    description:{type:String,requied:true},
    date:{type:String,requied:true},
    time:{type:String,requied:true},
    users:{type:Object,requied:true},
    period:{type:String,requied:true},
    room: {type: Types.ObjectId, ref: 'Room'},
})


module.exports=model("Task",schema);