import { assets } from "@/assets/assets";
const CartShop = () => {
    return (
        <div className="w-[400px] h-[400px] bg-slate-500 absolute top-10 right-0">
            <div className="flex gap-2">
                <img 
                className="h-[90px] w-[90px] object-cover "
                src={assets.banner_1} alt="anh 1" />
                <div className="flex flex-col p-5">
                    <h2>san pham 1</h2>
                    <span>Gia : 100 k</span>
                </div>
                <div>
                    h
                </div>
            </div>
        </div>
    );
}

export default CartShop;