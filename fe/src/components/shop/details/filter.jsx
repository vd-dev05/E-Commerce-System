import { toast } from "@/hooks/use-toast";
import { Button } from "antd";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
const FilterProduct = () => {
    const { routeData, isLoading } = useSelector(state => state.shoppingProduct)
    const [visibleItems, setVisibleItems] = useState(5);
    const [price, setPrice] = useState({
        min: 0,
        max: 0
    })
    const handleSeacrhPrice = () => {
        if (price.min > price.max) toast({
            title: " Giá trị min không được lớn hơn max"
        })
        else {
            console.log(price);
        }


    }
    const handleShowMore = () => { setVisibleItems(routeData.length); };
    return (
        <div className="flex flex-col gap-5">
            <Link
                to={'/shop/all_categories'}
                className="flex gap-2 items-center">
                <span><Menu /></span>
                <h2>Tất cả danh mục</h2>
            </Link>
            <hr className="my-2" />
            {/* listing route */}
            <div>
                {isLoading === false ? routeData.slice(0, visibleItems).map((item) => (
                    <div >
                        <Link
                            to={`?categrory=${item.query}`}> {item.name} </Link>

                        {/* {visibleItems < 5 && (  )} */}
                    </div>

                )) : <p>Loading ... </p>}
                {/* {visibleItems < 5 && (  )} */}
                <button
                    className={`${visibleItems > 5 ? 'hidden' : 'block'} py-2`}
                    onClick={handleShowMore}>Hiển thị thêm</button>
            </div>
            {/* Khoang Gia */}
            <div>
                <h2>Khoảng Giá</h2>
                <form action="">
                    <div className="flex items-center p-2">
                        <input type="number"
                            min={0}
                            className="border-2 w-[100px] h-[40px] outline-none  rounded-lg p-2"
                            onChange={(e) => setPrice({ ...price, min: e.target.value })}
                            placeholder="Từ " />
                        <div>---</div>
                        <input type="number"
                            className="border-2 w-[100px] h-[40px] outline-none  rounded-lg p-2"
                            onChange={(e) => setPrice({ ...price, max: e.target.value })}
                            min={0}
                            placeholder="Đến" />
                    </div>

                    <Button
                        onClick={handleSeacrhPrice}
                        style={{ backgroundColor: '#ff4d4d', color: 'white', width: '100%' }}
                    >Áp Dụng</Button>

                </form>

            </div>
            {/* Danh gia  */}
            <div>
                <h2>Đánh giá</h2>
                {/* <span className="flex">
                    {[...Array(5)].map((item, index) => (
                        <FaStar key={index} />
                    ))}
                </span>
                <span className="flex">
                    {[...Array(5)]..map((item, index) => (
                        <FaStar key={index} />
                    ))}
                </span> */}
                {[...Array(5)].map((item, index) => (
                    <span key={index} className="flex space-x-1 gap-2 px-2 my-2">
                        {[...Array(5 - index)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 m-[1px]" />
                        ))}
                        {[...Array(index)].map((_, i) => (
                            <FaRegStar key={i} className="text-gray-300 m-[1px]" />

                        ))}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default FilterProduct;