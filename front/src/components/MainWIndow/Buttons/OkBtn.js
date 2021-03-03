import React from 'react'
import './Buttons.css'


const OkBtn = (props) => {

    const onClickHandler = () => {


        
        props.funArr.forEach((e,i) => {
            e(...props.args[i] ); 
         });
         
    }

    return <div className="btn-conteiner  center-btn">
   <div className="btn-conteiner__create-btn" id="createBtn" onClick={onClickHandler}>{props.text}</div>
    </div>
}
export default OkBtn;