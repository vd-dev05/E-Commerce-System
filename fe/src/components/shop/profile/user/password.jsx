import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

const PasswordProfile = () => {
    const [passType, setPassType] = useState(false)
    const [password,setPassword] = useState({
        pass : '',
        confirmPass : ''
    })

    const handleSubmit = () => {
        if (password.pass === password.confirmPass) {
            console.log(password);
        } else {
            alert("chua dung password")
        }
        
    }
    return (
        <div className="px-10 py-5">
            <h1>Đổi Mật Khẩu</h1>
            <div className="flex flex-col gap-5">
                <input
                    className="outline-none w-[400px] h-[50px] border-2 border-gray-400 p-2 rounded-sm"
                    placeholder="Nhập mật khẩu cũ"
                    type="password" />

                <div className="outline-none w-[400px] h-[50px] border-2 border-gray-400 p-2 rounded-sm relative">
                    <input
                        className="w-full outline-none"
                        placeholder="Nhập mật khẩu mới"
                        value={password.pass}
                        onChange={(e) => setPassword({...password,pass : e.target.value}) }
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
                        onChange={(e) => setPassword({...password,confirmPass : e.target.value}) }
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