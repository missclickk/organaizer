import React from "react"
import { Route,Redirect } from 'react-router-dom';
import "./index.css"
import  Header from "./components/header/Header"
import Content from './components/content/content/Content'
import LoginWin from './components/loginWin/LoginWin'
    localStorage.setItem('login',false)
function App() {
  return (
    <div className="App">
      < Header/>
      <Redirect from='/' to='/LOGIN'/>
      <Content/>
      <Route path="/LOGIN"><LoginWin/></Route>
    </div>
  );
}

export default App;
