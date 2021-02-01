import React from 'react'
import './../TaskWindow.css'
const UserInput = () => (<div className="task-conteiner__users-conteiner">
    <label>Видно пользователям: </label>
    <label>МНЕ </label>
    <input type="checkbox" value="MEN" />
    <label> not МНЕ </label>
    <input type="checkbox" id="test" value="NE MNE" />
</div>
)

export default UserInput;