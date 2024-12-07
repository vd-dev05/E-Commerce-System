import { assets } from '@/assets/assets'
import ShoppingProductCard from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Title from '@/components/ui/Title'
import { fetchAllFilteredProducts } from '@/store/shop-slice/products-slice'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRecordVinyl } from 'react-icons/fa';
import { SiAdidas, SiNike, SiPuma, SiZara } from "react-icons/si";
import { FaWatchmanMonitoring } from "react-icons/fa6";
import { useNavigate } from 'react-router'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cart-slice'



const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

const brandsWithIcon = [

    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "levi", label: "Levi's", icon: FaRecordVinyl },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "h&m", label: "H&M", icon: FaWatchmanMonitoring },

]

const ShoppingHome = () => {

    const slides = [assets.banner_1, assets.banner_2, assets.banner_3]
    const [currentSlide, setCurrentSlide] = useState(0)
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.shopProducts)
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handleToListingPage = (getItem, section) => {
        sessionStorage.removeItem('filters');
        const filter = {
            [section]: [getItem]
        }
        sessionStorage.setItem('filters', JSON.stringify(filter))
        navigate('/shop/listing')

    }

    const handleAddToCart = (productId) => {

        dispatch(addToCart({
            userId: user?.id,
            productId: productId,
            quantity: 1
        })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: 'Successfully added to the cart.'
                })
            }
        }
        )
    }



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length)

        }, 10000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParmas: {}, sortParams: '' }))
    }, [dispatch])





    return (
        <div className='flex flex-col min-h-screen'>
            <div className='relative w-full h-[600px] overflow-hidden'>
                {
                    slides.map((slide, index) =>
                    (
                        <img
                            src={slide}
                            key={index}
                            className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                            alt={`Slide ${index}`}
                        />
                    )
                    )

                }
                <Button variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2' onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
                    <ChevronLeftIcon className='size-4' />
                </Button>
                <Button variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2' onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} >
                    <ChevronRightIcon className='size-4' />
                </Button>
            </div>
            <section className='py-12 '>
                <div className='container mx-auto px-4 text-3xl text-center'>
                    <Title text_1={'Shop'} text_2={'by Category'} />
                    <div className='grid grid-clos-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10'>
                        {
                            categoriesWithIcon.map((item, index) => (
                                <Card onClick={() => handleToListingPage(item.id, 'category')} className='cursor-pointer hover:shadow-lg transition-shadow rounded-full' key={index}>
                                    <CardContent className='flex flex-col items-center justify-center p-6'>
                                        <item.icon className='size-12 mb- text-primary' />
                                        <span className='font-light'>{item.label}</span>
                                    </CardContent>

                                </Card>

                            ))
                        }

                    </div>
                </div>

            </section>
            <section className='py-12 '>
                <div className='container mx-auto px-4 text-3xl text-center'>
                    <Title text_1={'Shop'} text_2={'by Brand'} />
                    <div className='grid grid-clos-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10'>
                        {
                            brandsWithIcon.map((item, index) => (
                                <Card onClick={() => handleToListingPage(item.id, 'brand')} className='cursor-pointer hover:shadow-lg transition-shadow' key={index}>
                                    <CardContent className='flex flex-col items-center justify-center p-6'>
                                        <item.icon className='size-12 mb- text-primary' />
                                        <span className='font-light'>{item.label}</span>
                                    </CardContent>

                                </Card>

                            ))
                        }

                    </div>
                </div>

            </section>
            <section className='py-12'>
                <div className='container mx-auto px-4 text-3xl text-center'>
                    <Title text_1={'Feature'} text_2={'Products'} />
                    <div className='grid grid-clos-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-10 mt-10 text-start'>
                        {
                            products && products.length > 0 ? (
                                products.slice(0, 5).map((product, index) => (
                                    <ShoppingProductCard product={product} handleAddToCart={handleAddToCart} key={index} />
                                ))
                            ) : null
                        }

                    </div>
                </div>
            </section>

        </div>
    )
}

export default ShoppingHome
