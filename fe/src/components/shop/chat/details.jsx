import { toast } from "@/hooks/use-toast";
import { formatDateCountDown, formatTitleLenght } from "@/lib/utils";
import { addMessageChat, getMessageChat, getRoomChat } from "@/store/Shop/users/userThunk";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';

const chatMessage = io(`${import.meta.env.VITE_REACT_APP_SOCKET_APP}`);
export {
    chatMessage
}
const ChatDetails = ({ setIsOpen, isOpen }) => {
    // const chatconnect = io(`${import.meta.env.VITE_REACT_APP_SOCKET_APP}`);

    const dispatch = useDispatch();
    const { payloadRoomChat, isLoadingRoomChat, payloadMessageRoom, roomId } = useSelector(state => state.shoppingProduct);
    const [room, setRoom] = useState();
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoad, setDataLoad] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {

        (async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/token/accesstoken/id`, {
                withCredentials: true,
            });
            setId(res.data);
        })();
        if (roomId) {
            chatMessage.emit('joinRoom', roomId);
            chatMessage.emit('receive_message', (msg) => {
                msg.data.forEach((item) => {
                    setData((pre) => [...pre, item])
                })
            })
        }


    }, [roomId]);

    useEffect(() => {
        chatMessage.on('receive_message', (msg) => {
      
        
            // if (msg.data.length === 0) {
            //     return
            // }

            msg.data.forEach((item) => {
                setData((pre) => [...pre, item])
            }

            )
            // else if (
            //     // msg.count === 5
            //     msg.count > 1
            // ) {

            //     dispatch(addMessageChat({ roomId: roomId, message: msg.data }));
            //     chatMessaage.emit("clearCache", {roomId, message : msg.data} )
            // }
        });
        chatMessage.on('sendDb', (msg) => {
            console.log(msg);
            dispatch(addMessageChat({ roomId: roomId, message: msg }));
        });

    
        return () => {
            chatMessage.off('sendDb');
            chatMessage.off('receive_message');

        }
    }, [chatMessage, isLoading]);

    useEffect(() => {
        dispatch(getRoomChat());
    }, []);

    useEffect(() => {
        if (payloadMessageRoom) {
            setData(payloadMessageRoom);
            setDataLoad(true);
        }
    }, [payloadMessageRoom]);

    const handleSendMessage = async () => {

        if (message.trim() === '') {
            toast({
                title: "Vui long nhap tin nhan",
                status: "error"
            });
            return;
        };
        chatMessage.emit("sendMessage", {
            _id: null,
            chat_room_id: roomId,
            sender_id: id,
            sender_type: "user",
            message: message,
            timestamp: Date.now(),
        });

        setMessage('');
        setIsLoading(true);
        // chatconnect.off("sendMessage")
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const fetechChat = async (id) => {
        dispatch(getMessageChat({ roomId: id }));
    };

    return (
        <div className="bg-slate-50 w-[600px] h-[450px]">
            <div className="flex justify-between items-center bg-slate-400 p-2">
                <h1
                    onClick={() => console.log(data)}
                >Tin nhắn</h1>
                <IoClose className="float-right cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <div className="flex p-2">
                <div className="w-2/5 flex flex-col gap-2">
                    {payloadRoomChat && !isLoadingRoomChat ? (
                        payloadRoomChat.map((item) => (
                            <button
                                onClick={() => fetechChat(item._id)}
                                className="cursor-pointer bg-slate-500 flex gap-2"
                                key={item._id}
                            >
                                <img
                                    className="w-[50px] h-[50px] object-cover rounded-full"
                                    src="https://down-vn.img.susercontent.com/file/c652e52ce1c2187aaa4e67fa060a3f16@resize_w80_nl.webp"
                                    alt=""
                                />
                                <div>
                                    <h5 className="text-nowrap">
                                        {formatTitleLenght(item?.managerId?.manager_name, 10)}
                                    </h5>
                                </div>
                            </button>
                        ))
                    ) : 'loading'}
                </div>
                <div className="flex flex-col w-full">
                    <div className="bg-red-300">
                        <div className="h-[350px] overflow-y-scroll">
                            {dataLoad && [...new Map(data.map(item => [item.timestamp, item])).values()]
                                .sort((a, b) => a.timestamp - b.timestamp)
                                .map((item, index) => (
                                    <div className="flex gap-2" key={index}>
                                        {item.sender_type === 'user' ? (
                                            <div className="flex flex-col">

                                                <p className="bg-slate-500 p-2 rounded-md">{item.message}</p>
                                                <small className="text-[10px] text-slate-500">{formatDateCountDown(item.timestamp)}</small>


                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                <p className="bg-zinc-500 p-2 rounded-md">{item.message}</p>
                                                <small className="text-[10px] text-zinc-500">{formatDateCountDown(item.timestamp)}</small>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                ))}

                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center border-[2px] p-2">
                        <input
                            value={message}
                            className="w-full outline-none h-full"
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="text-nowrap"><IoSend /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatDetails;

