import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import axios from "axios"

const AdminLogin = () => {
    const [value , setValue] = useState({
        username : '',
        password : ''
    })


    const handleLogin = async() => {
        if (value.username === import.meta.env.VITE_REACT_APP_TK && value.password === import.meta.env.VITE_REACT_APP_MK && value.username !== '' && value.password !== '' ) {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/admin/login`, {
                user : value.username,
                password : value.password,
               credentials: 'include'
            });
           
            
            // console.log(response);
            
            
            toast({
                title: 'Đăng nhập thành công',
                variant: 'success',
                description: 'Chuyển hướng đến trang quản trị',
            })
            setTimeout(() => {
            // window.location.href = '/admin/home'
           }, 1000)
        } else {
            toast({
                // =))
                title: 'Sai tài khoản hoặc mật khấu', 
                variant: 'destructive',
                description: 'Vui lòng thử lại',
            })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl">Admin Login</h1>
            <div className="flex flex-col p-10 gap-2"> 
                <input 
                className="p-2 border-2 border-black" 
                type="text" placeholder='username' 
                onChange={(e) => setValue({...value , username : e.target.value})}
                />
                <input 
                 className="p-2 border-2 border-black" 
                 type="password" placeholder='password'
                    onChange={(e) => setValue({...value , password : e.target.value})}
                 />
            </div>
            <button 
            onClick={() => handleLogin()}
            className="p-2 border-2 border-black">Login</button>
        </div>
      );
}
 
export default AdminLogin;