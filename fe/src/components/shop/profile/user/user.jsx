import TypingEffectProfile from "@/hooks/textAmination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from "axios";
import { uploadAvatar } from "@/store/Shop/users";

const UserProfile = () => {
    const { user, isAuthenticated } = useSelector(state => state.shoppingAuth)
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
        gender: user?.gender,
        birthday: user?.birthday
    })
    const [file, setFile] = useState(null)
    const {avatar ,  isLoading} = useSelector(state => state.shoppingProduct)
    const dispath = useDispatch()
    
    useEffect(() => {
        if (isLoading === true) {
            console.log(avatar);
            
            setData({...data, avatar: avatar?.avatar})
        }
    }, [isLoading])
    
    const hanldeUpload = () => {
        if (!file) message.error('Please select an image')
        dispath(uploadAvatar(file))
    }
    // const props =   {
    //     // name: 'avatar',
    //     action: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/file-upload`,
    //     // method : 'POST',
    //     // headers: {
    //     //     authorization: `Bearer ${token}`,
    //     // },
    //     onChange(info){
    //         console.log(info);
            
    //         if (info.file.status !== 'uploading') {
    //             dispath(uploadAvatar(info.file.originFileObj))
    //             // const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/user/upload/avatar`, {
    //             //     avatar: info.file.originFileObj
    //             // })
    //             // console.log(info.file, info.fileList);
    //         }
    //         // if (info.file.status === 'done') {
    //         //     message.success(`${info.file.name} file uploaded successfully`);
    //         // } else if (info.file.status === 'error') {
    //         //     message.error(`${info.file.name} file upload failed.`);
    //         // }
        // },
    // };

    return (
        <div className="py-5 px-5">
            {/* user profile */}
            {isAuthenticated === true && (
                <TypingEffectProfile nameUser={user?.username} />
            )}
            {
                isAuthenticated === true ? <div className="px-5 py-[1px]">
                    <h2>Hồ sơ của tôi</h2>
                    <p>Quản lí thông tin của bạn</p>
                    <hr className="my-2" />

                    <div className="flex gap-4 items-center">
                        <div>
                            <label htmlFor="name">Tên đăng nhập</label>
                            <input type="text" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />

                            <label htmlFor="email">Email</label>
                            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                        </div>

                        <div className="flex flex-col gap-5 justify-center items-center">
                            <h3>Thay đổi ảnh của bạn </h3>

                            <Avatar className="bg-black cursor-pointer w-[100px] h-[100px] ">
                                <AvatarFallback className="bg-black text-white flex items-center font-extralight">
                                    <p>{user?.username[0].toUpperCase()}</p>
                                </AvatarFallback>
                                {data.avatar && <img src={data.avatar} alt="" className="w-full h-full object-cover" />}
                            </Avatar>
                            <Upload
                        
                            onChange={(info) => {
                               setFile(info.file)
                            }}
                            >
                                <Button
                                // onClick={hanldeUpload}
                                icon={<UploadOutlined />}>Tai lên ảnh</Button>
                            </Upload>
                        </div>
                    </div>
                </div> : <div>Loading ...</div>
            }

        </div>
    );
}

export default UserProfile;

