import React from 'react'
import './Buttons.css'
const AddBtn=(props)=>{

    const onClickHandler=()=>{
        props.funArr.forEach((e,i) => {
           e(...props.args[i] );
            
        });
        }


    return <div className='btn-conteiner end-btn'>
    <div className="btn-conteiner__add-btn" id="addBtn" onClick={onClickHandler}><img name="newTask" alt="NEW TASK" className="small"  src="./newTask.svg" /></div>
</div>
}

export default AddBtn;