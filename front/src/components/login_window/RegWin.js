import React from 'react'
import './LoginWin.css'
import { connect } from 'react-redux'
import { regUser, switchUserWin } from './../../redux/actions'
import InputsWrapper from './components/InputsWrapper'

const RegWin = ({ regUser, errorList, switchUserWin, winType }) => {

    const onClickHanlder = (event) => {
        const target = event.target;
        const data = {
            email: document.querySelector('#email').value,
            login: document.querySelector('#login').value,
            password: document.querySelector('#pas').value,
            rPassword: document.querySelector('#rPas').value,
        }
        switch (target) {
            case document.querySelector('.login-win__authSpan'):
                switchUserWin("AUTH")
                break;
            case document.querySelector('.newRoom'):
                regUser(data)
                break;
            case document.querySelector('.oldRoom'):
                regUser({ ...data, room: document.querySelector('#room').value })
                break;
            default:
                break;
        }
    }


    return <div className="login-win-conteiner">
        <div className="login-win">
            <h1 className="login-win__title">РЕГИСТРАЦИЯ</h1>
            <div className="login-win__from">
               <InputsWrapper/>
            </div>
            <div className="login-win__text">Если вы уже зарегистрированы нажмиете " <span className='login-win__authSpan' onClick={onClickHanlder}>Авторизироваться</span>" </div>
            <div className='login-win__btn-wrapper'>
                <div className='oldRoom login-win__submitBtn' onClick={onClickHanlder}>ВОЙТИ В КОМНАТУ</div>
                <div className='newRoom login-win__submitBtn' onClick={onClickHanlder}>СОЗДАТЬ НОВУЮ КОМНАТУ</div>
            </div>

            { errorList.reduce((a,b)=>{
                   return  a.concat(` ${b} `);
            }," ")}
        </div>
    </div>
}

const mapStateToPorops = (state) => ({
    errorList: state.user.errorList,
})

const mapDispatchToProps = {
    regUser,
    switchUserWin,
}
export default connect(mapStateToPorops, mapDispatchToProps)(RegWin);