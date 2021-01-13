import Recat from "react"
import styles from "./../content/content.module.css"
import MessageArea from "./message area/MessageArea"
import WriteArea from "./write area/WriteArea"
const ChatBlock=()=>{

    return <div className={styles.content__chat}>
          <MessageArea/> 
          <WriteArea/>
        </div>
}

export default ChatBlock;
