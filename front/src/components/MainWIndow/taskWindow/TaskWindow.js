import React,{useEffect} from 'react'
import { connect } from 'react-redux'


import './TaskWindow.css'
import { WinTask, createTask, clearErrorList, getTasks, addTodo, setTodoTask,getTodos,getUsersList } from './../../../redux/actions'
import CloseBtn from './../Buttons/CloseBtn'
import OkBtn from './../Buttons/OkBtn'
import ErrorList from './ErrorList'
import InputsConteiner from './inputs/InputsConteiner'


const TaskWindow = ({getUsersList,room,login,getTodos,todoId,setTodoTask, addTodo, getTasks, date, closeWin, closeWinTodo, closeWinTask, createTask, clearErrorList, printMode, type}) => {
   
    useEffect(() => {
        if (closeWin || closeWinTodo) {
            closeWinTask(null);
        }
    }, [closeWin, closeWinTodo, closeWinTask])

    const getDataFromForm = (conteiner) => {
        let taskObj = {};
        let usersList = {};
        conteiner.childNodes.forEach(elem => {
            elem.childNodes.forEach((e) => {
                if ((e.nodeName !== "LABEL" && e.nodeName !== "DIV") || e.className === "checkbox-wrapper") {
                    if (e.className === "checkbox-wrapper")
                        e = e.childNodes[1];
                    e.type === "checkbox" ? usersList[e.value] = e.checked : taskObj[e.name] = e.value;
                }
            })
        })
        taskObj['users'] = usersList;
        return taskObj;
    }


    const executeFun = () => {
        const conteiner = document.querySelector(".task-conteiner__input-conteiner");
        const taskObj = getDataFromForm(conteiner);
     
        switch (type) {
            case 'taskInput':
                createTask(taskObj,room)
                getTasks(printMode, date,room,login)
                break;
            case 'outputTask':
                getTasks(printMode, date,room,login)
                break;
            case 'todo':
                addTodo(taskObj,room)
                getTodos(login,room);
                break;
            case "todoTask":
                setTodoTask( todoId,taskObj.title);
                getTodos(login,room);
                break;
            default:
                break;
        }
    }

    const closeWinBack = (event) => {
        if (event.target === document.querySelector(".conteiner-background")) {
            closeWinTask(null);
            clearErrorList(false);
        }
    }

    const okBtn = type === "taskOutput" ? <OkBtn funArr={[closeWinTask, clearErrorList]} args={{ 0: [null], 1: [false] }} text='OK' /> : <OkBtn funArr={[executeFun]} args={{ 0: [] }} text='СОЗДАТЬ' />;

    getUsersList(room);
    return <div className="conteiner-background" onClick={closeWinBack}>
        <div className="task-conteiner">
            <CloseBtn funArr={[closeWinTask, clearErrorList]} args={{ 0: [null], 1: [null] }} />
            <InputsConteiner type={type} />
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
        closeWinTodo: state.todo.closeWinTodo,
        date: state.date.date,
        todoId:state.todo.todoId,
        login:state.user.loginUser,
        room:state.user.roomID
    }
};


const mapDisptachToProps = {
    closeWinTask: WinTask,
    createTask,
    clearErrorList,
    getTasks,
    addTodo,
    setTodoTask,
    getTodos,
    getUsersList    
}

export default connect(mapStateToProps, mapDisptachToProps)(TaskWindow)