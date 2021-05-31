import React from 'react'
import {connect} from 'react-redux'
import '../TaskWindow.css'
const UserInput = ({usersList}) => (<div className="task-conteiner__users-conteiner">

    <label>Видно пользователям: </label>
    {

        usersList.map((e,i)=>{
          return  <div className="checkbox-wrapper" key={i}>
            <label className="input__label6" >{e}</label>
            <input type="checkbox" className="checkbox-wrapper__input" value={e} />
            </div>
        })
    }
</div>
)

const mapStateToProps=(state)=>{
    return{
        usersList:state.user.usersList
    }
}

export default connect(mapStateToProps,null)(UserInput);