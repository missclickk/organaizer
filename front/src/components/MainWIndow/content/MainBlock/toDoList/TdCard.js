import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import './tdList.css'
import DeleteBtn from './../../../Buttons/DeleteBtn'
import { isTodoButtons,WinTask,deleteTodo,setTodoId ,getTodos} from './../../../../../redux/actions'
import TdCardItem from './TdCardItem'
import AddBtn from './../../../Buttons/AddBtn'
const TdCard = ({ login,room,title, tasks,isTodoButtons,openWinTask,id, deleteTodo,setTodoId,todoBtns,getTodos}) => {

const [flag,setFlag]=useState(false);

useEffect(()=>{
    if(flag)
     document.getElementById(`target${id}`).querySelector(".btnsWrapper").classList.add('visibilityHiden');
     else
     document.getElementById(`target${id}`).querySelector(".btnsWrapper").classList.remove('visibilityHiden');
},[flag,id])



    const cursorInside = ({ targetCor, X, Y }) => {
        return X > targetCor.left && X < targetCor.right && Y < targetCor.bottom && Y > targetCor.top;
    }
    const eventHandler = (event) => {
        const obj = {
            targetCor: document.querySelector(`#target${id}`).getBoundingClientRect(),
            X: event.clientX,
            Y: event.clientY
        }
        if (event.type === 'mouseover' && todoBtns===false){
            
            setFlag(true);
            isTodoButtons(true);
        }
        if (!cursorInside(obj) && todoBtns===true){
        
            setFlag(false);
            isTodoButtons(false);
        }
    }
   
   
   return <div className="tdList-conteiner__cards-conteiner__card" id={`target${id}`} onMouseOver={eventHandler} onMouseOut={eventHandler}>
        <div className="tdList-conteiner__cards-conteiner__card__header">
            <div className="tdList-conteiner__cards-conteiner__card__header__title">{title}</div>
            <div className="btnsWrapper">
                <DeleteBtn  funArr={[deleteTodo,getTodos]} args={{ 0: [id],1:[login,room]}}/>
                <AddBtn  funArr={[openWinTask,setTodoId]} args={{ 0: ['todoTask'],1:[id]}} />
                </div>
        </div>
        <div className="tdList-conteiner__cards-conteiner__card__body">
            {tasks.map((e,i)=> <TdCardItem  key={i} index={i} value={e.value}  parent={id} name={e.name}/>)}
        </div>
    </div>
}

const mapStateToPorops=(state)=>( {
        todoBtns:state.render.todoBtns,
        login:state.user.loginUser,
        room:state.user.roomID
    }
)
const mapDispatchToProps = {
    isTodoButtons,
    openWinTask:WinTask,
    deleteTodo,
    setTodoId,
    getTodos
}

export default connect( mapStateToPorops, mapDispatchToProps)(TdCard);