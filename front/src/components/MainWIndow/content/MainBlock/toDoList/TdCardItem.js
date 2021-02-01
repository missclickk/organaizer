import React from 'react'
import {connect} from 'react-redux'
import {changeTodoItem} from './../../../../../redux/actions'
import './tdList.css'

const TdCardItem=({value,name,parent,changeTodoItem})=>{

    const eventHandler=()=>{
                changeTodoItem(name,parent);
    }
    return <div className="tdItem">
        <input type="checkbox" className="tdItem__checkbox" onChange={eventHandler}/>
        <div className={value===false?"tdItem__name_normal":"tdItem__name_line-through"}> {name}</div>
    </div>

}

const mapDispatchToPorops={
    changeTodoItem
}

export default connect(null,mapDispatchToPorops)(TdCardItem);