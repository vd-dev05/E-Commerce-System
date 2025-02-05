import queryString from "query-string";
import { Link, useLocation } from "react-router";

const Voucher = () => {
    const location = useLocation()
    const query = queryString.parse(location.search)
   
    return (

        <div className="space-y-4 p-4 bg-white rounded shadow">
            <div>
                <h2 className="text-lg font-bold">Kho Voucher</h2>
            </div>
            <div className="space-y-2">
                <label htmlFor="" className="block text-sm font-medium">Mã voucher</label>
                <input type="text" placeholder="Nhập mã voucher tại đây" className="block w-full border border-gray-300 rounded p-2" />
            </div>
            <div className="flex space-x-4">
                <Link to={`?type=0`} className="text-blue-500 hover:underline">Tất cả</Link>
                <Link to={`?type=1`} className="text-blue-500 hover:underline">E-com</Link>
                <Link to={`?type=2`} className="text-blue-500 hover:underline">Shop</Link>
                <Link to={`?type=3`} className="text-blue-500 hover:underline">Scan</Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center space-x-4 cursor-pointer drop-shadow-md border-[1px] p-2 rounded-md relative">
                    <div className="flex gap-5 p-2">
                        {/* <img src={data[0].url} alt="" className="w-16 h-16 object-cover rounded" /> */}
                        <div>
                            <h3 className="font-semibold">Giảm 12%</h3>
                            <p className="text-sm text-gray-500">HSD : <span>12/12/2024</span></p>
                        </div>
                    </div>
                    <span 
                    className="absolute top-0 right-0 bg-red-300 p-[1px]  text-white"
                    >4</span>
                    <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  
                    >Dùng Ngày</button>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <img src={data[0].url} alt="" className="w-16 h-16 object-cover rounded" /> */}
                    <div>
                        <h3 className="font-semibold">Giảm 12%</h3>
                        <p className="text-sm text-gray-500">HSD : <span>12/12/2024</span></p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <img src={data[0].url} alt="" className="w-16 h-16 object-cover rounded" /> */}
                    <div>
                        <h3 className="font-semibold">Giảm 12%</h3>
                        <p className="text-sm text-gray-500">HSD : <span>12/12/2024</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Voucher;

