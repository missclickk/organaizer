import React from 'react';
import  "./header.css"
const   Header=()=>{
    return <div className='header'>
        <div className='header__empty-block first' ></div>
        <h1 className="header__name">ОБЫЧНЫЙ ОРГОНАЙЗЕР</h1>
        <div className='header__empty-block second'></div>
       <div className="header__btns-bar ">
           <div className="addUser"></div>
           </div> 

        </div>
};

export default Header;
