import TypingEffectProfile from "@/hooks/textAmination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Spin, Upload } from 'antd';
import axios from "axios";
import { editProfile, uploadAvatar } from "@/store/Shop/users/userThunk";
import { checkAuthUser } from "@/store/Shop/auth";
import { AvatarImage } from "@radix-ui/react-avatar";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useSelector(state => state.shoppingAuth)

    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        gender: user?.gender || '',
        birthday: user?.birthday || '',
        avartar: user?.avartar || ''
    })


    const [file, setFile] = useState(null)
    const { avatar, isSuccesEdit } = useSelector(state => state.shoppingProduct)
    const dispath = useDispatch()

    useEffect(() => {
        if (isAuthenticated === false) {
            dispath(checkAuthUser())

        }
    }, [])


    useEffect(() => {
        if (isLoading === false && user) {

            setData({ ...data, ...user })
        }
    }, [isLoading])

    useEffect(() => {
        if (isSuccesEdit === true) {
            // console.log(isSuccesEdit);

            message.success('Edit profile success')
            setEdit(!edit)
            setTimeout(() => {
                dispath(checkAuthUser())
            }, 2000);

        }
    }, [isSuccesEdit])

    const hanldeUpload = () => {

        if (!file) {
            message.error('Please select an image')
        } else {

            dispath(uploadAvatar(file)).then((data) => {

                if (data.payload.success === true) {
                    message.success("Upload avatar success")
                    dispath(checkAuthUser())
                }
            }).catch((error) => {
                console.log(error);

            })
        }

    }

    const handleEdit = () => {
        const regexUserName = /^[a-zA-Z_]{3,20}$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexUserName.test(data.username)) {
            message.error('Username must be between 3 and 20 characters long and only contain letters and underscores, not numbers');
        } else if (!regexEmail.test(data.email)) {
            message.error('Invalid email format');
        } else {
            setEdit(!edit)
            dispath(editProfile(data))
        }
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

    console.log(data, isAuthenticated);

    return (
        <div className="py-5 px-5">
            {/* user profile */}
            {isAuthenticated === true && (
                <TypingEffectProfile nameUser={user?.username} />
            )}
            {
                (isAuthenticated === true && isLoading === false && data) ?
                    <div className="px-5 py-[1px]">
                        <h2>Hồ sơ của tôi</h2>
                        <p>Quản lí thông tin của bạn</p>
                        <hr className="my-2" />

                        <div className="flex gap-4 items-center">
                            <div className="flex flex-col w-2/3 gap-2">
                                <label htmlFor="name" className="text-sm font-medium">Tên đăng nhập</label>
                                <input
                                    className="p-2 border border-zinc-300 rounded-md outline-none focus:ring-1 focus:ring-zinc-900"
                                    type="text" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />

                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input
                                    className="p-2 border border-zinc-300 rounded-md outline-none focus:ring-1 focus:ring-zinc-900"
                                    type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

                                <button
                                    onClick={handleEdit}
                                    style={{ width: "150px" }} className="hover:bg-red-700 text-white font-bol
                                d py-2 px-4 rounded text-xs bg-[#dc2626]">{edit ? <Spin size="small" /> : 'Luu thay doi'}</button>
                            </div>

                            <div className="flex flex-col gap-5 justify-center items-center">
                                <h3>Thay đổi ảnh của bạn </h3>
                                <Avatar>

                                    <AvatarImage src={`${isAuthenticated === true && user ? user.avartar : data ? data.avartar : ''}`} alt="@shadcn" />
                                  
                                </Avatar>
                                <div className="flex gap-2 items-center">
                                    <Button
                                        className="bg-white border border-zinc-300 p-2 rounded-md hover:bg-zinc-100"
                                        icon={<UploadOutlined />}
                                        onClick={() => {
                                            setFile()
                                            document.getElementById('upload-button').click()
                                        }
                                        }
                                    >
                                        Chon ảnh
                                    </Button>
                                    <input
                                        type="file"
                                        id="upload-button"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        className="bg-white border border-zinc-300 p-2 rounded-md hover:bg-zinc-100"
                                        icon={<UploadOutlined />}
                                        onClick={hanldeUpload}
                                    >
                                        Lưu ảnh
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div> : "Loading .."
            }

        </div>
    );
}

export default UserProfile;

