import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import  './content.css'
import ChatBlock from './../ChatBlock/ChatBlock'
import MainBlock from './../MainBlock/MainBlock'
import TaskWindow from './../../taskWindow/TaskWindow'
import TaskListWin from './../../TaskList/TaskListWin'
import { store } from './../../../index'
const renderModalWindow = (key,output) => {
    let window;
    switch (key) {
        case 'task':
            window =  output===true?  (<Provider store={store}> <TaskWindow output={true}/></Provider>): (<Provider store={store}> <TaskWindow output={false}/></Provider>)
            ReactDOM.render(window, document.querySelector(".modaleWindow"))
            break;

        case 'taskList':
            window = (<Provider store={store}> <TaskListWin /></Provider>)
            ReactDOM.render(window, document.querySelector(".modaleWindow"))
            break;
        default:
            break;
    }



}

const deleteModalWindow = () => {
    ReactDOM.unmountComponentAtNode(document.querySelector(".modaleWindow"))
}
const Content = (props) => {

    useEffect(() => {
        let key = 0
        props.isNewTask === true ? renderModalWindow('task', props.isTask) : key++;
        props.isTaskList === true ? renderModalWindow('taskList') : key++;
        key == 2 ? deleteModalWindow() : key = 0;
    }, [props.isNewTask, props.isTaskList])


    return <div className='content'>
        <MainBlock />
        <ChatBlock />
        <div className="modaleWindow" ></div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isNewTask: state.render.isNewTask,
        isTaskList: state.render.isTaskList,
        isTask: state.render.isTask,
    }
}

export default connect(mapStateToProps, null)(Content);

