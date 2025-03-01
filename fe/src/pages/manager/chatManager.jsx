import { chatMessage } from "@/components/shop/chat/details";
import { getMessageRoomId, getRoomAll } from "@/store/manager/chat";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import React from 'react';
import { Flex, Layout } from 'antd';
import { calculateLastSeen, formatTime, formatTitleLenght } from "@/lib/utils";
import { checkAuthManager } from "@/store/manager/auth";
import { toast } from "@/hooks/use-toast";
const { Header, Footer, Sider, Content } = Layout;


const ChatManager = () => {


    const dispatch = useDispatch()
    const { roomList, isLoadingRoom, messageList } = useSelector(state => state.managerChat)
    const { manager, isAuthenticated } = useSelector(state => state.managerAuth)
    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState([])
    const [payloadId, setPayloadId] = useState(null)
    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('')
    if (roomList === "false") {
        window.location.href = "/manager/login"
    }
    useEffect(() => {
        if (payloadId !== null) {


            chatMessage.emit("joinRoom", payloadId._id);
            chatMessage.emit("receive_message", (msg) => {
                msg.data.forEach((item) => {
                    setData(pre => [...pre, item])
                })
            })
        }

    }, [payloadId, dispatch])

    useEffect(() => {
        dispatch(checkAuthManager())
        dispatch(getRoomAll())

    }, [])
    useEffect(() => {
        if (messageList !== null) {
            setData(messageList)
            chatMessage.on('receive_message', (msg) => {
                msg.data.forEach((item) => {
                    setData(pre => [...pre, item])
                })

            });
            return () => {
                chatMessage.off('receive_message');
            }
        }
    }, [messageList])

    useEffect(() => {
        chatMessage.on('receive_message', (msg) => {
            msg.data.forEach((item) => {
                setData(pre => [...pre, item])
            })

        });

        return () => {
            chatMessage.off('receive_message');
        }

    }, [chatMessage, isLoading]);

    const handleJoinRoom = (roomId) => {
        dispatch(getMessageRoomId(roomId._id))
        setPayloadId(roomId)
        // setIsLoading(true)
    }

    const handleSendMessage = async () => {
        setIsLoading(false)
        if (isAuthenticated === false || isAuthenticated === null || manager === null) {
            window.location.href = "/manager/login"
        }

        if (message.trim() === '' || message === null) {
            toast({
                title: "Vui long nhap tin nhan",
                // status: "error"
            });
            return;
        } else {
            chatMessage.emit("sendMessage", {
                _id: null,
                chat_room_id: payloadId._id,
                sender_id: manager._id,
                sender_type: "manager",
                message: message,
                timestamp: Date.now(),
            });
            setMessage('')
            setIsLoading(true)
        }


    }
    
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [data]);

    return (
        <div className="flex flex-col ">
            <h3>Chat user</h3>
            <Flex
                className="w-full h-[500px] bg-gray-100"
                gap="middle" wrap>

                <Layout className="border-2  w-1/2 rounded">
                    <Sider width={200} className=" bg-gray-200">
                        <section className="w-full h-full">
                            {roomList && isLoadingRoom === false ? roomList.map((item) => {
                                return (
                                    <button
                                        onClick={() => handleJoinRoom(item)}
                                        key={item._id}
                                        className={`flex items-center gap-2 p-2 cursor-pointer w-full hover:bg-gray-300 ${payloadId && payloadId._id === item._id ? 'bg-gray-400' : ''} `}>
                                        <img
                                            className="w-5  h-5 rounded-full"
                                            src={item ? item.userId.avatar : ""}
                                            alt="anh test" />
                                        <div className="flex flex-col text-left">
                                            <h3>{item ? formatTitleLenght(item.userId.username, 10) : ''}</h3>
                                            <p className="text-nowrap text-gray-500" >{formatTitleLenght("test message", 7)}</p>
                                        </div>

                                    </button>
                                )
                            }) :
                                <div>
                                    ko co user nao
                                </div>}
                        </section>
                    </Sider>
                    {payloadId ?
                        <Layout className="max-w-full">
                            <section className="flex gap-2 p-2">

                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://down-vn.img.susercontent.com/file/813e2bf963729a83fb7485c805326d32@resize_w80_nl.webp" alt="" />
                                <div>
                                    <h3 className="">{payloadId.userId.username}</h3>
                                    <small className="">{calculateLastSeen(payloadId.userId.last_login)}</small>
                                </div>

                            </section>
                            <Content className="bg-white flex-1">
                                <div className="h-[400px] overflow-y-scroll">
                                    {data && [...new Map(data.map(item => [item.timestamp, item])).values()]
                                        .sort((a, b) => a.timestamp - b.timestamp)
                                        .map((item, index) => (
                                            <div key={index} className="flex gap-2">
                                                <div className="flex flex-col">
                                                    <p className={` p-2 rounded-md ${item.sender_type === "manager" ? "bg-gray-400" : "bg-gray-300"}`}>{item.message}</p>
                                                    <small className="text-[10px] text-gray-500">{formatTime(item.timestamp)}</small>
                                                </div>
                                            </div>
                                        ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </Content>
                            <section className=" border-2 p-2 flex gap-2 bg-gray-400  outline-none border-none">
                                <input type="text"
                                    value={message}
                                    className="w-full h-full bg-gray-400  outline-none border-none"
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-gray-400  outline-none border-none"
                                >Send</button>
                            </section>

                        </Layout>
                        : ''}

                </Layout>
            </Flex>


            {/* <section className="w-1/7">
                    <div>
                        <img
                            className="w-10 h-10 rounded-full"
                            src="https://down-vn.img.susercontent.com/file/813e2bf963729a83fb7485c805326d32@resize_w80_nl.webp" alt="" />
                    </div>
                </section>
                <div className=" border-[1px]  border-black"></div>

                <section className="w-full h-[100vh]">
                    <div>
                        <h3>User test</h3>
                        <small>12 h lass seen</small>
                    </div>
                    <div>
                        chat
                    </div>

                    <div>
                        <input type="text" />
                        <button>Send</button>
                    </div>
                </section> */}



        </div>
    );
}

export default ChatManager;