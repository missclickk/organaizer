import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import './tdList.css'
import TdCard from './TdCard.js'
const ToDoList = ({ todoTasks }) => {


useEffect(()=>{
    
})


let i=0;
let fin=[];
for(let obj in todoTasks){ 
    fin.push(<TdCard key={i} id={obj} title={todoTasks[obj].title} tasks={todoTasks[obj].tasks}/>);
i++;
}
    return  <div className='tdList-conteiner'>{ todoTasks.length === 0 ?<h1 className="tdList__message">СЕЙЧАС ЗДЕСЬ ПУСТО</h1>
        : <div className="tdList-conteiner__cards-conteiner">
           {fin}
        </div>}
    </div>
}



const mapStateToProps = (state) => {

    return {
        todoTasks: state.todo.todoTasks,
    }
}
const mapDispatchToProps={
    
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoList);