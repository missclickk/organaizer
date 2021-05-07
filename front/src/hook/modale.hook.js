import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import {Provider } from 'react-redux'
import TaskWindow from './../components/main_window/modal_windows/task_window/TaskWindow'
import TaskListWin from './../components/main_window/modal_windows/task_list/TaskListWin'
import { store } from './../index'

export const useModaleWin=()=>{

    const renderModalWindow = (key) => {
        let window;
        switch (key) {
            case 'inputTask':
                window = (<BrowserRouter><Provider store={store}> <TaskWindow type="taskInput" /></Provider></BrowserRouter>);
                ReactDOM.render(window, document.querySelector(".modaleWindow"))
                break;
            case 'outputTask':
                window = (<Provider store={store}> <TaskWindow type="taskOutput" /></Provider>)
                ReactDOM.render(window, document.querySelector(".modaleWindow"))
                break;
            case 'taskList':
                window = (<Provider store={store}> <TaskListWin /></Provider>)
                ReactDOM.render(window, document.querySelector(".modaleWindow"))
                break;
            case 'todo':
                window = <Provider store={store}> <TaskWindow type="todo" /></Provider>
                ReactDOM.render(window, document.querySelector(".modaleWindow"))
                break;
            case 'todoTask':
                window = <Provider store={store}> <TaskWindow type="todoTask" /></Provider>
                ReactDOM.render(window, document.querySelector(".modaleWindow"))
                break;
            default:
                break;
        }
    }

    const deleteWindow = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector(".modaleWindow"))
    }
   
    

return {renderModalWindow,deleteWindow};
}