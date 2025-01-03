import { assets } from "@/assets/assets";
import ShoppingHeader from "@/components/shop/header";
import Recommend from "@/components/shop/recommend";
import SaleProducts from "@/components/shop/sale";
import SearchTop from "@/components/shop/search";
import { SilderHome } from "@/components/shop/slides";
import { categoryList } from "@/config";
import { checkAuthUser, logoutUser } from "@/store/Shop/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const ShoppingHome = () => {

    const slides = [assets.banner_1, assets.banner_2, assets.banner_3, assets.banner_4]
    const slides_card = [assets.mbbankbanner, assets.shoppebanner]
    const [currentSlide, setCurrentSlide] = useState(0)
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser()).then(data => {
            if (data?.payload?.success) {
                navigate('/shop/login')
            }
        })
    }
    useEffect(() => {
        dispatch(checkAuthUser())
    }, [dispatch])


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length)

        }, 10000)

        return () => clearInterval(timer)
    }, [])



    return (
        <div className="">
            {/* img header */}
            <div className="min-w-full ">
                <img
                    className="object-cover w-full "
                    src="https://img.lazcdn.com/us/domino/e3242ccf-1386-4b2a-822a-41be1c8cf28d_VN-1188-80.png_2200x2200q80.jpg" alt="" />
            </div>
            {/* header */}
            <ShoppingHeader user={user} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <main className='flex flex-col w-full px-5 py-5'>
                {/* siler */}
                <section>
                    <div className="flex  w-full">
                        <div className={`w-3/4  `}>
                            <SilderHome slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
                        </div>
                        <div>
                            {Array.from({ length: slides_card.length }).map((_, index) => (
                                <div key={index} className="p-[2px]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={slides_card[index]} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* danh muc */}
                <section>
                    <div className="py-5">
                        <h2 className="text-xl font-normal">Danh mục</h2>
                        <div className="grid grid-cols-10 py-2 ">
                            {categoryList.map((item) => (

                                <Link key={item.id} to={`/shop/listing?category=${item.path}`} className="flex flex-col items-center py-5  gap-2 cursor-pointer hover:shadow-lg hover:border-slate-400 border border-gray-300">
                                    <img
                                        className="w-20 h-20 object-cover"
                                        src={item.url} alt="" />
                                    <span className="text-xs ">{item.label}</span>
                                </Link>
                            ))}
                        </div>

                    </div>
                </section>
                {/* sale do theo date */}
                <section className="">
                    < SaleProducts />
                </section>
                <section>
                    <SearchTop/>
                </section>
                {/* recommend */}
                <section>
                    <Recommend/>
                </section>
            </main>
        </div>
    );
}

export default ShoppingHome;