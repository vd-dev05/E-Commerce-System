import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cart-items-content'
import { useNavigate } from 'react-router'

const UserCartWrapper = ({ cartItems, setOpenCart }) => {

    const navigate = useNavigate()

    const totalCartAmout = cartItems && cartItems.length > 0 ?
        cartItems.reduce((sum, item) => sum + (item?.salePrice > 0 ? item.salePrice : item.price) * item?.quantity, 0) : 0
    return (
        <SheetContent className="sm:max-w-md overflow-auto">
            <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className='mt-8 space-y-4'>
                {
                    cartItems && cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <UserCartItemsContent cartItem={item} key={index} />

                        ))
                    ) : (<div className='text-md font-medium text-center'>Product Not Found!</div>)
                }
            </div>
            {
                cartItems && cartItems.length > 0 ? (
                    <>
                        <div className='mt-8 space-y-4'>

                            <div className='flex justify-between'>
                                <span className='font-bold'>Total</span>
                                <span className='font-bold'>${totalCartAmout.toFixed(2)}</span>
                            </div>

                        </div>
                        <Button onClick={() => {
                            navigate('/shop/checkout');
                            setOpenCart(false)
                        }} className='w-full mt-8'>Checkout</Button>
                    </>
                ) : null
            }

        </SheetContent>
    )
}

export default UserCartWrapper
