import { useSelector } from "react-redux";

const ModalNotification = () => {
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    return (
        <div className="w-[400px] h-[400px] bg-white drop-shadow-md rounded-md absolute top-5 right-5 z-10">
            {isAuthenticated === true && user !== null
                ?
                <div></div>
                :
                <div className=" absolute right-10 flex items-center flex-col justify-between h-full">
                    <div className="flex flex-col items-center">
                        <img
                            className="w-40 h-40 object-contain"
                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fc9c8de0048cfefe.png" alt="" />
                        <p>Ban phai dang nhap su dung tinh nang nay</p>

                    </div>

                    <div className="p-2 flex gap-2">
                        <button
                            onClick={() => nav("/shop/login")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Dang nhap</button>
                        <button
                            onClick={() => nav("/shop/register")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Dang ky</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ModalNotification;