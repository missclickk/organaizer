import React from 'react';
import { connect } from 'react-redux'
import "./header.css"

const Header = ({  roomId }) => {

const event=()=>{
    localStorage.removeItem('login');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('room');
}


    return <div className='header'>
        <div className='header__empty-block first' ></div>
        <h1 className="header__name" >ОБЫЧНЫЙ ОРГАНАЙЗЕР</h1>
        <div className='header__empty-block second'></div>
        <div className="header__btns-bar ">
            <div className="roomID">ID комнаты <span>{ roomId}</span></div>
            <div className="roomID" onClick={event}>ВЫЙТИ</div>
        </div>

    </div>
};
const mapStateToProps = (state) => (
    {
            roomId:state.user.roomID
    }
)

export default connect(mapStateToProps, null)(Header);
