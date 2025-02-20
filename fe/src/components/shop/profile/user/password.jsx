import { changePassword, checkAuthUser, checkPassword } from "@/store/Shop/auth";
import { message } from "antd";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";
import { auth }from "@/services/firebase/config";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { toast } from "@/hooks/use-toast";

const PasswordProfile = () => {
    const dispatch = useDispatch()
    const { isMessage, checkpassMessage, isNewPassword, isAuthenticated , user } = useSelector(state => state.shoppingAuth);
    const userEmail = user ? user.email : ''
    
    const [isChangePassword, setIsChangePassword] = useState(false)
    const nav = useNavigate()
    const location = useLocation()
    const query = queryString.parse(location.search)
    // console.log(query.verifyEmailOtp);

    const [passType, setPassType] = useState(false)
    const [password, setPassword] = useState({
        oldPass: '',
        pass: '',
        confirmPass: ''
    })
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified && user !== null) {
                    // console.log("Email đã được xác thực!");
                    nav(`/shop/profile/user/password?verifyEmail=true`)
                } else {
                    console.log("Email chưa được xác thực.");
                    nav(`/shop/profile/user/password?verifyEmail=fasle`)
                    //   const user = auth.currentUser;
                    //   sendVerificationEmail(user)
                } 
            } else if (!query?.isDone) {
                nav('/shop/profile/user/password?verifyEmailOtp=fasle')
            } 
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     if (isNewPassword === true) {

    //         message.success("Đổi mật khẩu thành công")
    //         setPassword({
    //             oldPass: '',
    //             pass: '',
    //             confirmPass: ''
    //         })
    //     }
    // }, [isNewPassword])
    const handleSubmit = () => {
        if (!password.pass || !password.confirmPass) {
            message.error("password requied")
        }
        if (password.pass === password.confirmPass) {
            dispatch(changePassword({ newPassword: password.pass })).then((data) => {
                console.log(data);
                
            }).catch((error) => {
                console.log(error);
                
            });
        } else {
            message.error("Mật khẩu không trùng khớp");
        }
        // dispatch(checkPassword({ password: password.oldPass })).then(() => {
        //     if (isMessage === false && checkpassMessage === "Mat khau dung") {
        //         if (password.pass === password.confirmPass) {
        //             dispatch(changePassword({ newPassword: password.pass }));
        //         } else {
        //             message.error("Mật khẩu không trùng khớp");
        //         }
        //     } else {
        //         message.error(checkpassMessage);
        //     }
        // });

    }

    const sendVerificationEmail = async (user) => {
        try {
            const user = auth.currentUser;
            await sendEmailVerification(user)
            console.log(user);

            toast({
                title: "Email xác thực đã được gửi!",
                description: "Vui lòng kiểm tra hoạt động email của bạn.",
                status: "success",
            })
            // console.log("Email xác thực đã được gửi!");
        } catch (error) {
            message.error("Lỗi khi gửi email xác thực")
        }
    };

    const handleSendVerificationEmail = async (email) => {
        try {
            const codeSetting = {
                url : "http://localhost:3000/verify-email",
                handleCodeInApp : true,
            }

            await sendSignInLinkToEmail(auth , email , codeSetting)
            
            message.success("Email xác thực đã được gửi. Vui lòng kiểm tra email!");
        } catch (error) {
            message.error("Lỗi khi gửi email xác thực: " + error.message);
        }
    };
    return (
        <div className="px-10 py-5">
            {/* <div>hello</div> */}
            {query?.verifyEmailOtp  ?
                <div className="flex flex-col items-center gap-3 border border-gray-300 p-5 rounded-md">
                    <p className="text-lg">Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin bằng một trong những cách sau.</p>
                    <button
                        className="bg-[#3A7BD5] hover:bg-[#2E73E9] text-white font-bold py-2 px-4 rounded-full shadow-md"
                        onClick={() => {
                            // const user = auth.currentUser;
                            // console.log(auth);
                            
                            handleSendVerificationEmail (userEmail);
                        }}
                    >
                        Xác minh bằng liên kết email
                    </button>
                </div>
                : ''}
            {query?.isDone  || query?.verifyEmail ?
                <div className="flex flex-col gap-5">
                    <h1>Đổi mật khẩu mới</h1>
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
                </div> :
                ''}
        </div>
    );
}

export default PasswordProfile;  