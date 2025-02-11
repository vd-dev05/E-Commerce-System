import { toast } from "@/hooks/use-toast";
import { Button } from "antd";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import queryString from "query-string";
import { locationQuery, locationPath, mapCategoryFromUrl } from "@/lib/utils";
import { postQueryProduct } from "@/store/Shop/users";
const FilterProduct = () => {
    const { routeData, isLoading } = useSelector(state => state.shoppingProduct)
    const [visibleItems, setVisibleItems] = useState(5);
    const dispatch = useDispatch()

    const path = locationPath() 

    const query = queryString.parse(locationQuery())
    const navigate = useNavigate()
    const [price, setPrice] = useState({
        min: 0,
        max: 0
    })
    const handleSeacrhPrice = () => {
        if (price.min > price.max) toast({
            title: " Giá trị min không được lớn hơn max"
        })
        else {
            let newQuery = { ...query, minPrice: price.min, maxPrice: price.max || 0 }
            navigate(`?${queryString.stringify(newQuery)}`)
        }


    }
    const handleShowMore = () => { setVisibleItems(routeData.length); };
    useEffect(() => {
        const pathSplit = decodeURI(path.split('/shop/listing/')[1])
        dispatch( postQueryProduct(pathSplit))
    }, [path])
    
    return (
        <div className="flex flex-col gap-5">
            <Link
                // to={'/shop/all_categories'}
                className="flex gap-2 items-center">
                <span><Menu /></span>
                <h2>Tất cả danh mục</h2>
            </Link>
            <hr className="my-2" />
            {/* listing route */}
            <div>
                {isLoading === false ? routeData?.slice(0, visibleItems).map((item, index) => (
                    <div key={index} >
                        <Link
                            to={`?categrory=${item.query}`}> {item.name}
                        </Link>

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
                        <div>-</div>
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
                {[...Array(5)].map((item, index) => (
                    <span
                        onClick={() => {
                            if (!query.ratingFilter || query.ratingFilter !== index + 1) {
                                let newQuery = { ...query, ratingFilter: 5 - index };
                                navigate(`?${queryString.stringify(newQuery)}`);
                            }
                        }}
                        key={index} className="flex space-x-1 gap-2 px-2 my-2 ">
                        {[...Array(5 - index)].map((_, i) => (
                            <FaStar
                                key={i} className="text-yellow-500 m-[1px] cursor-pointer" />
                        ))}
                        {[...Array(index)].map((_, i) => (
                            <FaRegStar
                                key={i} className="text-gray-300 m-[1px] cursor-pointer" />
                        ))}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default FilterProduct;