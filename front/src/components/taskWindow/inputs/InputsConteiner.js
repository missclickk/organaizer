import React from 'react'
import TitleInput from './TitleInput'
import DescriptionInput from './DescriptionInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import PeriodInput from './PeriodInput'
import UserInput from './UserInput'




const InputsConteiner = ({ type }) => {
  let commponent;
  switch (type) {
    case 'taskOutput':
      commponent = <div className='task-conteiner__input-conteiner'>
        <TitleInput type={type} />
        <DescriptionInput type={type} />
        <TimeInput type={type} />
        <PeriodInput type={type} />
      </div>
      break;
    case 'todo':
      commponent = <div className='task-conteiner__input-conteiner'>
        <TitleInput type={type} />
        <UserInput />
      </div>
      break;
    case 'taskInput':
      commponent = <div className='task-conteiner__input-conteiner'>
        <TitleInput type={type} />
        <DescriptionInput type={type} />
        <DateInput />
        <TimeInput type={type} />
        <PeriodInput type={type} />
        <UserInput />
      </div>
      break;
    case 'todoTask':
      commponent = <div className='task-conteiner__input-conteiner'>
        <TitleInput type={type} />
      </div>
      break;

    default:
      break;
  }

  return  commponent;
}

export default InputsConteiner;