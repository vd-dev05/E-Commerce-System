import { assets } from '@/assets/assets'
import { fetchProductDetails } from '@/store/shop-slice/products-slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { MoveLeft, Send } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Input } from '../ui/input'
import ShoppingProductReleted from './product-releted'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cart-slice'
import { toast } from '@/hooks/use-toast'


const ShopProductDetails = () => {

    const { productDetails, isLoading } = useSelector(state => state.shopProducts)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { productId } = useParams()


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
        if (productId) {
            dispatch(fetchProductDetails(productId));
        }
    }, [productId, dispatch])

    if (isLoading) {
        return <div className='text-center text-xl'>Loading product details...</div>;
    }

    return productDetails ? (
        <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 p-6'>
            <div className='flex items-center gap-12 border-b pb-4'>
                <Link to="/shop/listing">
                    <Button variant="outline">
                        <MoveLeft />
                    </Button>
                </Link>
                <h2 className='text-2xl font-semibold '>Product Details</h2>
            </div>
            <div className='flex gap-12 sm:gap-8 flex-col sm:flex-row pt-10 px-10'>
                <div className="flex-1 flex flex-col-reverse sm:flex-row">

                    <img src={productDetails?.image} alt='' className='w-full sm:w-[80%] h-auto' />

                </div>
                <div className='flex-1'>
                    <h1 className='font-medium text-3xl mt-2'>{productDetails.title}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className="w-3" />
                        <img src={assets.star_icon} alt="" className="w-3" />
                        <img src={assets.star_icon} alt="" className="w-3" />
                        <img src={assets.star_icon} alt="" className="w-3" />
                        <img src={assets.star_dull_icon} alt="" className="w-3" />
                        <p className='pl-3 text-gray-500'>(122 views)</p>
                    </div>
                    <div className='mt-5 text-2xl font-medium flex items-center gap-6'>
                        <p className={`${productDetails.salePrice > 0 ? 'line-through text-gray-500' : ""}`} >${productDetails.price}</p>
                        {
                            productDetails.salePrice > 0 ? (
                                <p>${productDetails.salePrice}</p>
                            ) : null
                        }
                    </div>

                    <p className='mt-5 text-gray-600 md:w-4/5 my-8'>{productDetails.description}</p>
                    <div className='flex items-center gap-4 mt-4 '>
                        <Button onClick={() => handleAddToCart(productDetails?._id)}>ADD TO CARD</Button>
                    </div>

                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>
            <div className='mt-20 flex flex-col mx-auto w-5/6 '>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Reviews (122)</b>
                    <p className='border px-5 py-3 text-sm'>Descripition</p>
                </div>
                <div className='border text-gray-500'>
                    <div className='flex flex-col gap-4  px-6 py-6 text-sm h-[300px] overflow-y-auto'>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='size-10 border'>
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-medium'>Phuc nguyen</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5 '>
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_dull_icon} alt="" className="w-3" />
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='size-10 border'>
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-medium'>Phuc nguyen</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5 '>
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_dull_icon} alt="" className="w-3" />
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='size-10 border'>
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-medium'>Phuc nguyen</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5 '>
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_dull_icon} alt="" className="w-3" />
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='size-10 border'>
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-medium'>Phuc nguyen</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5 '>
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_icon} alt="" className="w-3" />
                                        <img src={assets.star_dull_icon} alt="" className="w-3" />
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-4 px-4 flex gap-2'>
                        <Input placeholder='Write a review...' />
                        <Button>
                            <Send />
                        </Button>

                    </div>
                </div>

            </div>
            <ShoppingProductReleted category={productDetails.category} subCategory={productDetails.subCategory} brand={productDetails.brand} productId={productDetails._id} />
        </div>
    ) : <div className='text-center text-xl'>No product details available.</div>
}

export default ShopProductDetails
