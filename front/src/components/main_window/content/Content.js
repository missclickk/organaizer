import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import './content.css'
import { BrowserRouter } from 'react-router-dom'
import ChatBlock from './chat_block/ChatBlock'
import MainBlock from './main_block/MainBlock'
import TaskWindow from '../modal_windows/task_window/TaskWindow'
import TaskListWin from '../modal_windows/task_list/TaskListWin'
import { store } from '../../../index'
const renderModalWindow = (key, output = -1) => {
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

const deleteModalWindow = () => {
    ReactDOM.unmountComponentAtNode(document.querySelector(".modaleWindow"))
}
const Content = ({ winType,date }) => {
 
    useEffect(() => {
        if (winType == null)
            deleteModalWindow();
        renderModalWindow(winType);
    }, [winType])


    return <div className='content'>
        <MainBlock />
        <ChatBlock />
        <div className="modaleWindow" ></div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        winType: state.render.winType,
        date:state.date.date
    }
}

export default connect(mapStateToProps, null)(Content);

