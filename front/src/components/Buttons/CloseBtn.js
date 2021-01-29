import React from 'react'
import './Buttons.css'




const CloseBtn=(props)=>{
    const onClickHandler=()=>{
    props.funArr.forEach((e,i) => {
       e(...props.args[i] );
        
    });
    }
   return <div className='btn-conteiner end-btn '>
    <div className="btn-conteiner__close-btn" id="closeBtn" onClick={onClickHandler}>X</div>
</div>
}

export default CloseBtn;