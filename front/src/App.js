import React from "react"
import { Route, Redirect } from 'react-router-dom';
import {connect}from 'react-redux'
import "./index.css"
import MainWindow from './components/main_window/MainWindow'
import LoginWin from './components/login_window/LoginWin'

function App({isLogin}) {

   let item=isLogin==='login'? <Redirect from='/*' to='app'/>: <Redirect from='/*' to='login'/>;
  return (
    <div className="App">
      {item}
      <Route exact path='/app'><MainWindow/></Route>
      <Route exact path='/login'><LoginWin/></Route>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    isLogin:state.user.isLogin,
  }
}

export default connect(mapStateToProps,null)(App);
