import React from 'react'
import { connect } from 'react-redux'
import './TaskWindow.css'
import { WinTask, createTask,clearErrorList } from './../../redux/actions'

import CloseBtn from './../Buttons/CloseBtn'
import OkBtn from './../Buttons/OkBtn'
import ErrorList from './ErrorList'
import InputsConteiner from './inputs/InputsConteiner'
import { useEffect } from 'react'

const TaskWindow = (props) => {

    useEffect(()=>{
           if(props.closeWin){
           props.closeWinTask(false);}
    },[props.closeWin])

    const parseTask = () => {
        let taskObj = {};
        const conteiner = document.querySelector(".task-conteiner__input-conteiner");
        conteiner.childNodes.forEach(elem => {
            elem.childNodes.forEach((e) => {
                if (e.nodeName !== "LABEL" && e.nodeName !== "DIV") {
                    e.type === "checkbox" ? taskObj[e.value] = e.checked : taskObj[e.name] = e.value;
                }
            })
        })
        props.createTask(taskObj,props.printMode);
    }

    const closeWin=(event)=>{
        if(event.target==document.querySelector(".conteiner-background")){
        props.closeWinTask();
        props.clearErrorList(false);}
         }

const okBtn=props.output? <OkBtn funArr={[props.closeWinTask,props.clearErrorList]} args={{0:[],1:[false]}} text='OK'/>: <OkBtn funArr={[parseTask]} args={{0:[]}} text='СОЗДАТЬ'/>;

 

    return <div className="conteiner-background" onClick={closeWin}>
    <div className="task-conteiner">
      <CloseBtn funArr={[props.closeWinTask,props.clearErrorList]} args={{0:[],1:[false]}}/>
       <InputsConteiner output={props.output}/>
        <div className="task-conteiner__error-list-conteiner" >
        <ErrorList/>
        </div>
       {okBtn}
    </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        errorList: state.task.errorList,
       closeWin: state.task.closeWin,
        printMode:state.date.printMode
    }
};


const mapDisptachToProps = {
    closeWinTask:WinTask,
    createTask,
    clearErrorList
}

export default connect(mapStateToProps, mapDisptachToProps)(TaskWindow)