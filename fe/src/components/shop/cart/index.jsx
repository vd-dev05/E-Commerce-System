import { assets } from "@/assets/assets";
const CartShop = () => {


    return (
        <div className="w-[400px] h-[400px] bg-white drop-shadow-md rounded-md  absolute top-10 right-0">
            <div className="flex gap-2 p-2 justify-between items-center">
                <div className="flex ">
                    <img
                        className="h-[90px] w-[90px] object-cover "
                        src={assets.banner_1} alt="anh 1" />
                    <div className="flex flex-col p-5 items-start ">
                        <h2>san pham 1</h2>
                        <span>Gia : 100 k</span>
                    </div>
                </div>

                <div>
                    <h3>Số lượng: <span>2</span></h3>
                </div>
                
            </div>
            <div className="flex gap-2 p-2 justify-between items-center">
                <div className="flex ">
                    <img
                        className="h-[90px] w-[90px] object-cover "
                        src={assets.banner_1} alt="anh 1" />
                    <div className="flex flex-col p-5 items-start ">
                        <h2>san pham 1</h2>
                        <span>Gia : 100 k</span>
                    </div>
                </div>

                <div>
                    <h3>Số lượng: <span>2</span></h3>
                </div>
                
            </div>
            <div className="absolute bottom-2 right-10">
                <div></div>
                <button
                className="bg-red-400 rounded-lg p-2 text-white  "
                >Xem sanr pham</button>
            </div>
        </div>
    );
}

export default CartShop;