
import  "./../content/content.css"
import MessageArea from "./message area/MessageArea"
import WriteArea from "./write area/WriteArea"
const ChatBlock=()=>{

    return <div className='content__chat'>
          <MessageArea/> 
          <WriteArea/>
        </div>
}

export default ChatBlock;
