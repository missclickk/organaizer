import React from 'react'
import {connect} from 'react-redux'
import LoginWin from './LoginWin'
import RegWin from './RegWin'

const LoginWrapper=(props)=>props.winType==="REG"?<RegWin/>:<LoginWin/>;

const mapStateToProps=(state)=>(
    {    winType: state.render.userWinType,})

export default  connect(mapStateToProps,null)(LoginWrapper);