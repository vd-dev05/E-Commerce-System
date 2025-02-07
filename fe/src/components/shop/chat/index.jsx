import { useState } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import ChatDetails from "./details";

const UserChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (

        <div className="drop-shadow-sm bg-slate-50 "> 
           
            {isOpen 
            ? 
            <ChatDetails setIsOpen={setIsOpen}  isOpen={isOpen}/>
          
            :
            
              <button
              className="flex  items-center gap-2" 
              onClick={() => setIsOpen(!isOpen)}
              ><IoMdChatbubbles /> Tin nhắn</button> 
            }
        </div>
    );
}

export default UserChat;