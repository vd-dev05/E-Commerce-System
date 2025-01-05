import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { io } from 'socket.io-client';

const ChatDetails = ({ setIsOpen, isOpen }) => {
    const fakechat = [
        {
            id: 1, items: [
                { id: 'manager-1', role: 'manager', name: 'nha ban 1', content: 'hello', time: '1 phut truoc' },
                { id: 'user-1', role: 'user', name: 'user 1', content: 'hello', time: '1 phut truoc' },
            ]
        }
    ]
  
    const [room, setRoom] = useState()
    const [message, setMessage] = useState()
    const [data, setData] = useState()
    // useEffect(() => {
    //     const chatconnect = io('http://localhost:5001/chat-connect');
    //     chatconnect.on('chat', (msg) => {
            
            
    //     });
    //     return () => {
    //         chatconnect.off('chat');
    //     }
    // }, [])
    
    const test = async () => {
        const chatconnect = io('http://localhost:5001/chat-connect');
        chatconnect.emit('chat', (msg) => {
            console.log(msg);
        });
    }
    const  handleSendMessageTest = async () => {
        const chatconnect = io('http://localhost:5001/chat-connect');
        chatconnect.emit("chat", { message: message });
        chatconnect.on("chat", (msg) => {
            setData(msg.message)
            console.log(msg);
        })
        
    }
    const handleSendMessage = async () => {
       const chatconnect = io('http://localhost:5001/chat-connect');
       chatconnect.on("room")
       let alert = prompt("nhap id room")
       let role = prompt("nhap role ")
       let user = prompt("nhap userId ")
       chatconnect.emit("chat", {  room: alert , user: user ,role : role });
    }
    return (
        <div className="bg-slate-50  w-[600px] h-[450px] ">
            <div className="flex justify-between items-center bg-slate-400 p-2">
                <div
                onClick={handleSendMessage}
                >test</div>
                <div onClick={test}>test nhan tin nhan</div>
                <h1>Tin nhắn </h1>
                <IoClose className="float-right cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <div className="flex p-2 bg-slate-400">
                <div className="w-1/5">
                    <div>nha ban 1</div>

                </div>
                <div className="flex flex-col w-full">
                    <div className="bg-red-300">
                        <div>admin room{room}</div>
                        <div>
                            {data ? data : null}
                            {/* {fakechat.map((item) => (
                                <div key={item.id}>
                                    {item.items.map((item) => (
                                        <div className="px-[5px]">
                                            <div className="text-left">
                                                <div>{item.role === 'manager' ? item.content : ''}</div>
                                            </div>
                                            <div className="text-right">
                                                <div>{item.role === 'user' ? item.content : ''}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))} */}
                        </div>
                    </div>
                    <div className="w-full flex justify-center  items-center">
                        <input
                            className="w-full"
                            type="text" onChange={(e) => setMessage(e.target.value)} />
                        <button
                        onClick={ handleSendMessageTest}
                        className="text-nowrap"><IoSend /></button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ChatDetails;