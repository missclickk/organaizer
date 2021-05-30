import React from 'react'
import './LoginWin.css'
import { connect } from 'react-redux'
import { regUser, switchUserWin,authUser } from './../../redux/actions'
import EmailInput from './components/EmailInput'
import PasswordInput from './components/PasswordInput'
const LoginWin = ({errorList,switchUserWin,authUser}) => {

    const onClickHanlder = (event) => {
        const target = event.target;
        switch (target) {
            case document.querySelector('.login-win__submitBtn'):
               authUser({
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#pas').value,
                })
                break;
            case document.querySelector('.login-win__backBtn'):
                switchUserWin("REG")
                break;
            default:
                break;
        }
    }


    return <div className="login-win-conteiner">
        <div className="login-win">
            <h1 className="login-win__title">РЕГИСТРАЦИЯ</h1>
            <div className="login-win__from">
                <EmailInput />
                <PasswordInput id={'pas'} />
            </div>
                <div className='login-win__btn-wrapper'>
                    <div className="login-win__backBtn" onClick={onClickHanlder} >НАЗАД</div>
                    <div className='login-win__submitBtn' onClick={onClickHanlder}>ОК</div>
                </div>
        
            { errorList.reduce((a,b)=>a.concat(b)," ")}
        </div>
    </div>
}

const mapStateToPorops = (state) => ({
    winType: state.render.userWinType,
    errorList:state.user.errorList
})

const mapDispatchToProps = {
    regUser,
    switchUserWin,
    authUser
}
export default connect(mapStateToPorops, mapDispatchToProps)(LoginWin);