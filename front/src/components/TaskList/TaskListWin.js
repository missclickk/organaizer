import React from 'react'
import './TaskList.css'
import {connect} from 'react-redux'
import {TaskList} from '../../redux/actions'
import CloseBtn from './../Buttons/CloseBtn'
import ListItem from './ListItem'
const TaskListWin=(props)=>{

    const onClickHandler = (event) => {
        if (event.target === document.querySelector(".list-conteiner")) 
                props.closeTaskList(-1,null);
        }
    

     let list=props.tasks.map((e,i)=>{return<ListItem hash={e.title} key={i} time={e.time} title={e.title} />})

    return <div className="list-conteiner" onClick={onClickHandler}>
        <div className='list-conteiner__list-card'>
        <CloseBtn funArr={[props.closeTaskList]} args={{0:[-1,null]}}/>

            {list}

        </div>
    </div>
}


const mapStateToProps=(state)=>{
return{   tasks:state.task.renderTask}
}

const mapDispatchToProps={
 closeTaskList : TaskList }
export default connect(mapStateToProps,mapDispatchToProps)(TaskListWin);