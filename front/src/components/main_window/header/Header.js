import React from 'react';
import { connect } from 'react-redux'
import "./header.css"
import {logoutUser} from './../../../redux/actions'

const Header = ({  roomId,logoutUser }) => {



    return <div className='header'>
        <div className='header__empty-block first' ></div>
        <h1 className="header__name" >ОБЫЧНЫЙ ОРГАНАЙЗЕР</h1>
        <div className='header__empty-block second'></div>
        <div className="header__btns-bar ">
            <div className="roomID">ID комнаты <span>{ roomId}</span></div>
            <div className="roomID" onClick={logoutUser}>ВЫЙТИ</div>
        </div>

    </div>
};
const mapStateToProps = (state) => (
    {
            roomId:state.user.roomID
    }
)
const mapDispatchToProps={
logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
