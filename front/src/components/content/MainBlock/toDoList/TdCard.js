import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import './tdList.css'
import DeleteBtn from './../../../Buttons/DeleteBtn'
import { isTodoButtons,WinTask,deleteTodoCard ,setTodoHash} from './../../../../redux/actions'
import TdCardItem from './TdCardItem'
import AddBtn from './../../../Buttons/AddBtn'
const TdCard = ({ title, tasks,isTodoButtons,openWinTask,id, deleteTodoCard,setTodoHash }) => {

const [flag,setFlag]=useState(false);

useEffect(()=>{
    if(flag)
     document.getElementById(`target${id}`).querySelector(".btnsWrapper").classList.add('visibilityHiden');
     else
     document.getElementById(`target${id}`).querySelector(".btnsWrapper").classList.remove('visibilityHiden');
},[flag])



    const cursorInside = ({ targetCor, X, Y }) => {
        return X > targetCor.left && X < targetCor.right && Y < targetCor.bottom && Y > targetCor.top;
    }
    const eventHandler = (event) => {
        const obj = {
            targetCor: document.querySelector(`#target${id}`).getBoundingClientRect(),
            X: event.clientX,
            Y: event.clientY
        }
        if (event.type === 'mouseover'){
            setFlag(true);
            isTodoButtons(true);
        }
        if (!cursorInside(obj)){
            setFlag(false);
            isTodoButtons(false);
        }
    }


    let bodyItems=[];

    for(let item in tasks[title])
                   bodyItems.push(<TdCardItem  key={title} value={tasks[title][item]}  parent={title} name={item}/>)


    return <div className="tdList-conteiner__cards-conteiner__card" id={`target${id}`} onMouseOver={eventHandler} onMouseOut={eventHandler}>
        <div className="tdList-conteiner__cards-conteiner__card__header">
            <div className="tdList-conteiner__cards-conteiner__card__header__title">{title}</div>
            <div className="btnsWrapper">
                <DeleteBtn  funArr={[deleteTodoCard]} args={{ 0: [title]}}/>
                <AddBtn  funArr={[openWinTask,setTodoHash]} args={{ 0: ['todoTask'],1:[title]}} />
                </div>
        </div>
        <div className="tdList-conteiner__cards-conteiner__card__body">
            {bodyItems}
        </div>
    </div>
}
const mapDispatchToProps = {
    isTodoButtons,
    openWinTask:WinTask,
    deleteTodoCard,
    setTodoHash
}
const mapStateToProps = (state) => {
    return {
      tasks:state.todo.todoTasksHash
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TdCard);