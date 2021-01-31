import React from 'react'
import './Buttons.css'
import { NavLink } from 'react-router-dom';


const OkBtn = (props) => {

    const onClickHandler = () => {


        /*
        props.funArr.forEach((e,i) => {
            e(...props.args[i] ); 
         });
         */
    }

    return <div className="btn-conteiner  center-btn">
        {  //<div className="btn-conteiner__create-btn" id="createBtn" onClick={onClickHandler}>{props.text}</div>
        }
        <NavLink to="/LOGIN">Отдел 3</NavLink>
    </div>
}
export default OkBtn;