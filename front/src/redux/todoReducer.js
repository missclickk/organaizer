import { CHANGE_TASK_VALUE, CHANGE_ID, SET_TODOS, IS_TASK_WIN, GET_TODO_HASH } from './types'




const initialState = {
        todoTasks: [],
        closeWinTodo: false,
        taskHash: null,
        todoId: null,
    }


    const updateTasksById = (stateTasks,id, name, val) => {
        //let it=null;
        const taskWithId=stateTasks.filter((e,i)=>{
            if(e._id===id){
               // it=i;
                return true;}

        })[0];
        taskWithId.tasks.forEach(e => {
               if(e.name===name)
                e.val=val;
            });
        stateTasks[id]=taskWithId;
        return{...stateTasks};
    }

    export const todoReducer = (state = initialState, action) => {

        switch (action.type) {
                case IS_TASK_WIN:
                return { ...state, closeWinTodo: false, taskHash: null }

                case GET_TODO_HASH:
                return { ...state, taskHash: action.payload }

                case CHANGE_TASK_VALUE:
                    console.log(action.id);
                const tasks = { ...state.todoTasks, [action.id]: { ...state.todoTasks, todoTasks: updateTasksById(state.todoTasks,action.id, action.payload.name, action.payload.value) } };
                return { ...state,todoTask:tasks,testflag:1  };

                case SET_TODOS:
                return { ...state, todoTasks: action.payload }

                case CHANGE_ID: 
                return { ...state, todoId: action.payload }

                default:
                return state;
        }

    }
