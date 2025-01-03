import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { formatPrice, formatTitle } from '@/lib/utils';
import { Link } from "react-router";
import { HeartIcon } from 'lucide-react';

const SaleProducts = () => {
    const [timeLeft, setTimeLeft] = useState(3600);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);


    // Dữ liệu giả lập (12 giờ, mỗi giờ có 6 hay nhieu  sản phẩm)
    let dataFakeSale = [];
    for (let i = 0; i < 12; i++) {
        dataFakeSale.push({
            hour: i + 1,
            items: Array.from({ length: 6 }, (_, index) => ({
                name: `${Math.random().toString(36).substring(7)}`,
                url: 'https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_400x400q80.jpg_.avif',
                price: Math.random() * 100000,
                path: '/shop/men',
                id: index + 1,
                discount: Math.random() * 9000,
                discount_type : `${Math.floor(Math.random() * 40)}`,
            }))
        });
    }

    // Khi kết nối với socket
    useEffect(() => {
        const socket = io('http://localhost:5001');

        socket.on('countdown', (time) => {
            if (time && time.timeStart > 0 && timeLeft >= 0) {
                // Lọc dữ liệu theo giờ và lấy 6 phần tử
                const filteredData = dataFakeSale.filter(item => item.hour === time.timeStart);
                setData(filteredData[0]?.items || []); // Lấy mảng sản phẩm của giờ hiện tại

                setTimeLeft(time.timeLeft);      // Cập nhật thời gian còn lại từ server

                setIsLoading(time.timeLeft <= 1); // Cập nhật trạng thái loading khi hết thời gian
            } else {
                setIsLoading(true);
            }
        });
    }, []);

    // Hàm định dạng thời gian
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="py-5 ">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-10">
                    <h2 className="text-xl font-normal">Deal chớp nhoáng</h2>
                    <div>
                        <div>
                            {isLoading ? <div>Loading...</div> : <div>{formatTime(timeLeft)}</div>}
                        </div>
                    </div>
                </div>
                <Link to="/all-deals">Xem tất cả</Link>
            </div>

            <div className="grid grid-cols-6 gap-2 py-2 px-5 bg-slate-500">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 flex-col hover:scale-105 group">
                            <div className="w-full h-4/6 bg-gray-200 rounded-md overflow-hidden relative">
                                <span className='absolute top-2 left-2 bg-red-500 text-white text-xs py-1 px-4 rounded-lg'>{item.discount_type ? '-' + item.discount_type + '%' : ''}</span>
                                <img src={item.url} alt={item.name} className="w-full h-full object-cover " />
                                <button className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    Add to Cart
                                </button>
                                <HeartIcon 
                                onClick={() => alert('Add to wishlist')}
                                size={20}
                               className="absolute top-2 right-2 w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="w-full flex flex-col text-left text-nowrap">
                                <h3 className="text-lg">{item.name ? formatTitle(item.name) : ''}</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-[17px]">{item.price ? formatPrice(item.price) : 0} VNĐ</p>
                                    <span className="text-xs text-red-500 line-through">
                                        {item.discount ? formatPrice(item.discount) : 0} VNĐ
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SaleProducts;
