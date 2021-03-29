import React from 'react'
import EmailInput from './EmailInput'
import LoginInput from './LoginInput'
import PasswordInput from './PasswordInput'
import RoomIdInput from './RoomIdInput'
const InputsWrapper=()=> <div>
    <EmailInput/>
    <LoginInput/>
    <PasswordInput id={'pas'}/>
    <PasswordInput id={'rPas'}/>
    <RoomIdInput/>
</div>


export default InputsWrapper

