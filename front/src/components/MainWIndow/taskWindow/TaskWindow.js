import React from 'react'
import { connect } from 'react-redux'
import './TaskWindow.css'
import { WinTask, createTask, clearErrorList,craeteTodoList ,createTodoTask} from './../../../redux/actions'

import CloseBtn from './../Buttons/CloseBtn'
import OkBtn from './../Buttons/OkBtn'
import ErrorList from './ErrorList'
import InputsConteiner from './inputs/InputsConteiner'
import { useEffect } from 'react'

const TaskWindow = ({ closeWin,closeWinTodo, closeWinTask,  createTask,clearErrorList, printMode,type, craeteTodoList,createTodoTask}) => {

    useEffect(() => {
        if (closeWin || closeWinTodo) {
            closeWinTask(null);
        }
    }, [closeWin,closeWinTodo,closeWinTask])

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
       printMode==='TD_LIST'?type==="todoTask"?createTodoTask(taskObj.title):craeteTodoList(taskObj.title): createTask(taskObj, printMode);
    }

    const closeWinBack = (event) => {
        if (event.target === document.querySelector(".conteiner-background")) {
            closeWinTask(null);
            clearErrorList(false);
        }
    }

    const okBtn = type==="taskOutput" ?<OkBtn funArr={[closeWinTask, clearErrorList]} args={{ 0: [null], 1: [false] }} text='OK' /> : <OkBtn funArr={[parseTask]} args={{ 0: [] }} text='СОЗДАТЬ' />;



    return <div className="conteiner-background" onClick={closeWinBack}>
        <div className="task-conteiner">
            <CloseBtn funArr={[closeWinTask, clearErrorList]} args={{ 0: [null], 1: [null] }} />
            <InputsConteiner  type={type} />
            <div className="task-conteiner__error-list-conteiner" >
                <ErrorList />
            </div>
            {okBtn}
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        errorList: state.task.errorList,
        closeWin: state.task.closeWin,
        printMode: state.render.mainBlockItem,
        closeWinTodo:state.todo.closeWinTodo,
    }
};


const mapDisptachToProps = {
    closeWinTask: WinTask,
    createTask,
    clearErrorList,
    craeteTodoList,
    createTodoTask
}

export default connect(mapStateToProps, mapDisptachToProps)(TaskWindow)