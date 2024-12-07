import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItem } from '@/store/shop-slice/cart-slice'

const UserCartItemsContent = ({ cartItem }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleCartItemDelete = (getCartItem) => {
        dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }))
    }

    const handleUpdateQuantity = (getCartItem, typeOfAction) => {
        dispatch(updateCartItem({
            userId: user?.id, productId: getCartItem.productId,
            quantity: typeOfAction === 'plus' ? getCartItem.quantity + 1 : getCartItem.quantity - 1
        }))
    }

    return (
        <div className='flex items-center space-x-4 border-b pb-4'>
            <img src={cartItem?.image} alt={cartItem?.title} className='size-20 rounded object-cover' />
            <div className='flex-1'>
                <h3 className='font-extralight'>{cartItem?.title}</h3>
                <div className='flex items-center gap-8 mt-1'>
                    <div>
                        <p className={`font-semibold`}>
                            ${
                                cartItem?.salePrice > 0 ?
                                    (cartItem?.salePrice * cartItem?.quantity).toFixed(2)
                                    : (cartItem?.price * cartItem.quantity).toFixed(2)
                            }
                        </p>

                    </div>
                    <div className='flex items-center gap-2'>
                        <Button variant='outline' size='icon' disabled={cartItem.quantity === 1} className="size-8 rounded-xl" onClick={() => handleUpdateQuantity(cartItem, 'decrease')}>
                            <Minus className='size-4' />
                            <span className='sr-only'>Decrease</span>
                        </Button>
                        <span>{cartItem?.quantity}</span>
                        <Button variant='outline' size='icon' className="size-8 rounded-xl" onClick={() => handleUpdateQuantity(cartItem, 'plus')}>
                            <Plus className='size-4' />
                            <span className='sr-only'>Plus</span>
                        </Button>
                    </div>
                </div>
            </div>
            <Trash onClick={() => handleCartItemDelete(cartItem)} className='cursor-pointer hover:text-red-500' size={20} />
        </div>
    )
}

export default UserCartItemsContent
