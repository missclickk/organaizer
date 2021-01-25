import React from 'react'
import TitleInput from './TitleInput'
import DescriptionInput from './DescriptionInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import PeriodInput from './PeriodInput'
import UserInput from './UserInput'




const InputsConteiner = ({ output }) => (output === true ? [
  <div className='task-conteiner__input-conteiner'>
    <TitleInput output={output} />
    <DescriptionInput output={output} />
    <TimeInput output={output} />
    <PeriodInput output={output} />
  </div>,
]
  : [<div className='task-conteiner__input-conteiner'>
    <TitleInput output={output} />
    <DescriptionInput output={output} />
    <DateInput />
    <TimeInput output={output} />
    <PeriodInput output={output} />
    <UserInput />
  </div>,
  ])

export default InputsConteiner;