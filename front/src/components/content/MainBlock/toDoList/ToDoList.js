import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import './tdList.css'
import TdCard from './TdCard.js'
const ToDoList = ({ todoTasksHash }) => {
    let fin=[];
    let arr=[];
for(let title in todoTasksHash)
arr.push(title); 
fin=arr.map((e,i)=> <TdCard key={i} id={i} title={e}/>)

    return  <div className='tdList-conteiner'>{ todoTasksHash.length === 0 ?<h1 className="tdList__message">СЕЙЧАС ЗДЕСЬ ПУСТО</h1>
        : <div className="tdList-conteiner__cards-conteiner">
           {fin}
        </div>}
    </div>
}



const mapStateToProps = (state) => {

    return {
        todoTasksHash: state.todo.todoTasksHash,
    }
}

export default connect(mapStateToProps, null)(ToDoList);