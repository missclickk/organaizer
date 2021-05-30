import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './content.css'
import ChatBlock from './chat_block/ChatBlock'
import MainBlock from './main_block/MainBlock'
import {useModaleWin} from './../../../hook/modale.hook'


const Content = ({ winType}) => {
    const {renderModalWindow, deleteWindow}=useModaleWin();

    useEffect(() => {
        if (winType == null)
            deleteWindow();
        renderModalWindow(winType);
    }, [winType,deleteWindow,renderModalWindow])


    return <div   className='content'>
        <MainBlock/>
        <ChatBlock />
        <div className="modaleWindow" ></div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        winType: state.render.winType,
    }
}

export default connect(mapStateToProps, null)(Content);

