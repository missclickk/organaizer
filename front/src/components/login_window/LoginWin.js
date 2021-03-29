import React from 'react'
import './LoginWin.css'
import { connect } from 'react-redux'
import { regUser, switchUserWin,authUser } from './../../redux/actions'
import EmailInput from './components/EmailInput'
import PasswordInput from './components/PasswordInput'
import LoginInput from './components/LoginInput'
import RoomIdInput  from './components/RoomIdInput '
const LoginWin = ({ regUser,  errorList,switchUserWin, winType ,authUser}) => {

    const onClickHanlder = (event) => {
        const target = event.target;
        switch (target) {
            case document.querySelector('.login-win__authSpan'):
                switchUserWin("AUTH")
                break;
            case document.querySelector('.nR'):
                regUser({
                    email: document.querySelector('#email').value,
                    login: document.querySelector('#login').value,
                    password: document.querySelector('#pas').value,
                    rPassword: document.querySelector('#rPas').value,
                })
                break;
                case document.querySelector('.oR'):
                    regUser({
                        email: document.querySelector('#email').value,
                        login: document.querySelector('#login').value,
                        password: document.querySelector('#pas').value,
                        rPassword: document.querySelector('#rPas').value,
                        room: document.querySelector('#room').value
                    })
                    break;
            case document.querySelector('.auth'):
               authUser({
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#pas').value,
                  
                })
                break;
            case document.querySelector('.back'):
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
                {winType === "REG" ? <LoginInput /> : <div />}
                <PasswordInput id={'pas'} />
                {winType === "REG" ? <PasswordInput id={'rPas'} /> : <div />}
                {winType === "REG" ? <RoomIdInput /> : <div />}
            </div>
            {winType === "REG" ? <div className="login-win__text">Если вы уже зарегистрированы нажмиете "<span className='login-win__authSpan' onClick={onClickHanlder}>Авторизироваться</span>"</div> :
                <div />}

            {winType == "REG" ?
               <div className='login-win__btn-wrapper'>
                <div className='oR login-win__submitBtn' onClick={onClickHanlder}>ВОЙТИ В КОМНАТУ</div>
                <div className='nR login-win__submitBtn' onClick={onClickHanlder}>СОЗДАТЬ НОВУЮ КОМНАТУ</div>
                </div>
                :
                <div className='login-win__btn-wrapper'>
                    <div className="back  login-win__backBtn" onClick={onClickHanlder} >НАЗАД</div>
                    <div className='auth login-win__submitBtn' onClick={onClickHanlder}>ОК</div>
                </div>
            }
            { errorList.map(e=>{
                return e+"\n"
            })};
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