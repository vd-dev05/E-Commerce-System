import { changePassword, checkAuthUser, checkPassword } from "@/store/Shop/auth";
import { message } from "antd";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PasswordProfile = () => {
    const dispatch = useDispatch()
    const { isMessage, checkpassMessage , isNewPassword } = useSelector(state => state.shoppingAuth);
    // console.log(isMessage ,checkpassMessage);

    const [passType, setPassType] = useState(false)
    const [password, setPassword] = useState({
        oldPass: '',
        pass: '',
        confirmPass: ''
    })

    useEffect(() => {
        if (isNewPassword === true) {
            
            message.success("Đổi mật khẩu thành công")
            setPassword({
                oldPass: '',
                pass: '',
                confirmPass: ''
            })
        }
    }, [isNewPassword])
    const handleSubmit = () => {
        dispatch(checkPassword({ password: password.oldPass })).then(() => {
            if (isMessage === false && checkpassMessage === "Mat khau dung") {
                if (password.pass === password.confirmPass) {
                    dispatch(changePassword({ newPassword: password.pass }));
                } else {
                    message.error("Mật khẩu không trùng khớp");
                }
            } else {
                message.error(checkpassMessage);
            }
        });
     
    }
    return (
        <div className="px-10 py-5">
            <h1>Đổi Mật Khóa</h1>
            <div className="flex flex-col gap-5">
                <input
                    className="outline-none w-[400px] h-[50px] border-2 border-gray-400 p-2 rounded-sm"
                    value={password.oldPass}
                    onChange={(e) => setPassword({ ...password, oldPass: e.target.value })}
                    placeholder="Nhập mật khẩu cũ"
                    type="password" />

                <div className="outline-none w-[400px] h-[50px] border-2 border-gray-400 p-2 rounded-sm relative">
                    <input
                        className="w-full outline-none"
                        placeholder="Nhập mật khẩu mới"
                        value={password.pass}
                        onChange={(e) => setPassword({ ...password, pass: e.target.value })}
                        type={passType ? 'password' : 'text'} />

                    {passType ? <EyeClosedIcon
                        size={20}
                        className="absolute top-3 right-5 cursor-pointer"
                        onClick={() => setPassType(!passType)} /> : <EyeIcon
                        size={20}
                        className="absolute top-3 right-5 cursor-pointer"
                        onClick={() => setPassType(!passType)}
                    />}
                </div>

                <div className="outline-none w-[400px] h-[50px] border-2 border-gray-400 p-2 rounded-sm relative">
                    <input
                        className="w-full outline-none"
                        placeholder="Xác nhận mật khẩu mới"
                        value={password.confirmPass}
                        type={passType ? 'password' : 'text'}
                        onChange={(e) => setPassword({ ...password, confirmPass: e.target.value })}
                    />

                    {passType ? <EyeClosedIcon
                        size={20}
                        className="absolute top-3 right-5 cursor-pointer"
                        onClick={() => setPassType(!passType)} /> : <EyeIcon
                        size={20}
                        className="absolute top-3 right-5 cursor-pointer"
                        onClick={() => setPassType(!passType)}
                    />}
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="w-[400px] border-red-400 border-2 p-3"
                    >Xác nhận đổi</button>
                </div>
            </div>

        </div>
    );
}

export default PasswordProfile;  