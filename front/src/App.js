import React from "react"
import { Route, Redirect } from 'react-router-dom';
import {connect}from 'react-redux'
import "./index.css"
import MainWindow from './components/main_window/MainWindow'
import LoginWrapper from "./components/login_window/LoginWrapper";

function App({isLogin}) {

  return (
    <div className="App">
      {isLogin==='login'? <Redirect from='/*' to='app'/>: <Redirect from='/*' to='login'/>}
      <Route exact path='/app'><MainWindow/></Route>
      <Route exact path='/login'><LoginWrapper/></Route>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    isLogin:state.user.isLogin,
  }
}

export default connect(mapStateToProps,null)(App);
