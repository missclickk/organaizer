import React from 'react'
import styles from './content.module.css'
import ChatBlock from './../ChatBlock/ChatBlock'
import MainBlock from './../MainBlock/MainBlock'


const Content=()=>{

    return <div className={styles.content}>
        <div className={styles.content__header}>Content</div>
        <MainBlock/>
        <ChatBlock/>
        <div className={styles.content__clearblock }></div>
        </div>
}

export default Content;

