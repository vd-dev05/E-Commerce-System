
import { fetchProductDetails } from '@/store/shop-slice/products-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { MoveLeft, Send, ShoppingCartIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Input } from '../ui/input'
import ShoppingProductReleted from './product-releted'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cart-slice'
import { toast } from '@/hooks/use-toast'
import { Label } from '../ui/label'
import StarRating from '../common/star-rating'
import { createCommentProduct, getCommentProduct } from '@/store/shop-slice/comment-slice'



const ShopProductDetails = () => {

    const { productDetails, isLoading } = useSelector(state => state.shopProducts)
    const { user } = useSelector(state => state.auth)
    const { comments } = useSelector(state => state.comment)
    const { cartItems } = useSelector(state => state.shopCart)
    const [reviewMessage, setReviewMessage] = useState('')
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    const { productId } = useParams()


    const handleAddToCart = (productId, getTotalStock) => {

        let getCartItems = cartItems.items || []
        if (getCartItems.length) {
            const indexItem = getCartItems.findIndex(
                item => item.productId === productId
            )
            if (indexItem > -1) {
                const getQuantity = getCartItems[indexItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });
                    return
                }
            }
        }

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
            } else {
                toast({
                    title: 'Please log in to make a purchase.'
                })
            }
        }
        )
    }

    const handleRating = (getRating) => {
        setRating(getRating)
    }

    const handleAddComment = (e) => {
        e.preventDefault();
        dispatch(createCommentProduct({
            productId: productDetails?._id,
            userId: user ? user?.id : null,
            username: user ? user?.username : 'Anonymous',
            reviewMessage: reviewMessage,
            reviewValue: rating
        })).then((data) => {
            if (data?.payload?.success) {
                setRating(0);
                setReviewMessage('')
                dispatch(getCommentProduct(productDetails?._id))
                toast({
                    title: 'Comment product successful!'
                })
            }

        })
    }

    const averageComment = comments && comments.length > 0 ?
        comments.reduce((sum, commentItem) => sum + commentItem.reviewValue, 0)
        / comments.length : null;

    useEffect(() => {
        if (productDetails !== null) dispatch(getCommentProduct(productDetails?._id))
    }, [productDetails])

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetails(productId));
        }
    }, [productId, dispatch])
    console.log(comments);


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
                        <StarRating rating={averageComment} size={24} />
                        <p className='pl-3 text-gray-500'>({comments?.length > 0 ? comments?.length : '0'} views)</p>
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
                        {
                            productDetails.totalStock === 0 ?
                                (
                                    <Button className="opacity-60 cursor-not-allowed bg-gray-500">
                                        Out Of Stock
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>
                                        <ShoppingCartIcon /> ADD TO CARD
                                    </Button>
                                )
                        }
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
                    <div className='flex flex-col gap-4 px-6 py-6 text-sm h-[300px] overflow-y-auto'>

                        {
                            comments && comments.length > 0 ? (
                                comments.map((item, index) => (
                                    <div className='grid gap-6' key={index}>
                                        <div className='flex gap-4'>
                                            <Avatar className='size-10 border'>
                                                <AvatarFallback>{item?.username[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className='grid gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    <h3 className='font-medium'>{item?.username}</h3>
                                                </div>
                                                <div className='flex items-center gap-0.5'>
                                                    <StarRating rating={item?.reviewValue} size={12} />
                                                </div>
                                                <p className='text-muted-foreground'>{item?.reviewMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            ) : <h1>No comment</h1>
                        }


                    </div>
                    <div className='my-4 px-4 flex flex-col gap-2'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Label className='font-bold'>Star Rating:</Label>
                            <div className='flex gap-2'>
                                <StarRating rating={rating} handleRating={handleRating} size={24} />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Input name='reviewMessage' value={reviewMessage} onChange={(e) => setReviewMessage(e.target.value)}
                                placeholder='Write a review...' />
                            <Button disabled={reviewMessage.trim() === ''}
                                onClick={handleAddComment}
                            >
                                <Send />
                            </Button>
                        </div>



                    </div>
                </div>

            </div>
            <ShoppingProductReleted category={productDetails.category} subCategory={productDetails.subCategory} brand={productDetails.brand} productId={productDetails._id} />
        </div>
    ) : <div className='text-center text-xl'>No product details available.</div>
}

export default ShopProductDetails
