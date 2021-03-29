import React from 'react'
import './Buttons.css'



const DeleteBtn = (props) => {
    const onClickHandler = () => {
        props.funArr.forEach((e, i) => {
            e(...props.args[i]);
        });
    }

    return <div className="btn-conteiner  end-btn">
        <div onClick={onClickHandler} className="btn-conteiner__delete-btn" id="deleteBtn"><img alt="удалить"  className="small"src="./trashcan.svg" /></div>
    </div>
}

export default DeleteBtn;

