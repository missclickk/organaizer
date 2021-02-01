import React from 'react'
import './LoginWin.css'
import { connect } from 'react-redux'
import { isLogin,switchUserWin } from './../../redux/actions'
import EmailInput from './components/EmailInput'
import PasswordInput from './components/PasswordInput'
const LoginWin = ({ isLogin,switchUserWin,winType }) => {

    const onClickHanlder = (event) => {
        const target = event.target;
        switch (target) {
            case document.querySelector('.login-win__authSpan'):
                switchUserWin("AUTH")
            break;
            case document.querySelector('.reg'):
                isLogin({
                    email: document.querySelector('#email').value,
                    pas: document.querySelector('#pas').value,
                    rPas: document.querySelector('#rPas').value,
                })
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
            
            {winType==="REG"?<PasswordInput id={'rPas'} />:<div/>}
            </div>
            {winType==="REG"?  <div className="login-win__text">Если вы уже зарегистрированы нажмиете "<span className='login-win__authSpan' onClick={onClickHanlder}>Авторизироваться</span>"</div>:
            <div/>}
            
            <div className={`${winType==="REG"? 'reg': 'auth'} login-win__submitBtn`} onClick={onClickHanlder}>ОК</div>
        </div>
    </div>
}

const mapStateToPorops=(state)=>({
   winType:state.render.userWinType
})

const mapDispatchToProps = {
    isLogin,
    switchUserWin
}
export default connect(mapStateToPorops, mapDispatchToProps)(LoginWin);