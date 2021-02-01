import React from 'react'
import './../LoginWin.css'


const PasswordInput=({id})=><div className="login-win__buf">
    <label className='login-win__from__label'>{id==='pas'?" ":"ПОВТОРИТЕ "}ПАРОЛЬ</label> 
    <input type="password" id={id}  className='login-win__from__input' />
</div>


export default PasswordInput;

