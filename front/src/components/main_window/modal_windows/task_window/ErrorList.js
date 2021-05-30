import React from 'react'
import {connect} from 'react-redux'

const ErrorList=({list})=>{

    
    const text=list.map((e,i)=><li key={i} >{e}</li>);
        
    return <div className="testV">
    <ul>
        {text}
        </ul>
    </div>
}

const mapStateToProps=(state)=>{
    return {
        
        list:state.task.errorList
    }
}

export default connect(mapStateToProps,null)(ErrorList);