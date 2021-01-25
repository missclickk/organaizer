import React,{useEffect} from 'react'
import {connect} from 'react-redux'

const ErrorList=({list})=>{

    let text=``;
        list.forEach(e => {
            text=text+`${e} \n`;
         });
    return <div className="testV">
        {text}
    </div>
}

const mapStateToProps=(state)=>{
    return {
        
        list:state.task.errorList
    }
}

export default connect(mapStateToProps,null)(ErrorList);