import React from 'react'
import {} from 'react-redux'
import styles from "./../content/content.module.css"
import Calendar from "./calendar/Calendar"
import WeekList from './weekList/WeekList'
import DateBlock from "./dateBlock/dateBlock"
const MainBlock=()=>{



return <div className={styles.content__main}>
    
    <DateBlock/>
   <WeekList/>
</div>
}

export default MainBlock;