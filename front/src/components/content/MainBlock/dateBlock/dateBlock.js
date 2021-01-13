import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import styles from "./dateBlock.module.css"
import { changeDate } from "./../../../../redux/actions"
const DateBlock = (props) => {
    const [dateFlag, setDateFlag] = useState(true);
    let date;
    useEffect(() => {
        if (dateFlag === true) {
            date = ((props.date.month() + 1) + ":" + props.date.year());
            console.log(date);
            document.querySelector(`.${styles.dateBlock__date}`).innerHTML = date;
            setDateFlag(false);
        }
    })


    const onClickHandler = event => {
        props.changeDate(event.target.name);
        setDateFlag(true);
    }
    return <div className={styles.dateBlock}>
        <div className={styles.dateBlock__arrowLeft} name="prev" onClick={onClickHandler}><img name="prev" className={styles.dateBlock__arrowImg} alt="Влево" src="./arrowLeft.jpeg" /></div>
        <div className={styles.dateBlock__date}>{date}</div>
        <div className={styles.dateBlock__arrowRight} name="next" onClick={onClickHandler}><img name="next" className={styles.dateBlock__arrowImg} alt="Вправо" src="./arrowRight.jpeg" /></div>

    </div>

}

const mapStateToProps = state => {

    return {
        date: state.date.date
    }
}
const mapDispatchToProps = {
    changeDate
}
export default connect(mapStateToProps, mapDispatchToProps)(DateBlock);
