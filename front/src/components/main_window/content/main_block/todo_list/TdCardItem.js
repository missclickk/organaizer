import React from 'react'
import {connect} from 'react-redux'
import {changeTodoTask, getTodos} from '../../../../../redux/actions'
import './tdList.css'

const TdCardItem=({login,room,value,name,parent, changeTodoTask,index, getTodos})=>{
    const eventHandler=()=>{
        changeTodoTask(name,parent,value,index);
        getTodos(login,room)
    }
    return <div className="tdItem">
        <input type="checkbox"   checked={value===false? 'checked': ""} className="tdItem__checkbox" onChange={eventHandler}/>
        <div className={value===true?"tdItem__name_normal":"tdItem__name_line-through"}  onClick={eventHandler}>  {name}</div>
    </div>

}

const mapDispatchToPorops={
    changeTodoTask,
    getTodos
}
const mapStateToProps=(state)=>({
    login:state.user.loginUser,
    room:state.user.roomID
})
export default connect(mapStateToProps,mapDispatchToPorops)(TdCardItem);