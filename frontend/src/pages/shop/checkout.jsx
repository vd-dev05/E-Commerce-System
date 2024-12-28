import { assets } from '@/assets/assets'
import Address from '@/components/shop/address'
import UserCartItemsContent from '@/components/shop/cart-items-content'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { createNewOrder } from '@/store/shop-slice/order-slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const ShoppingCheckOut = () => {

    const { cartItems } = useSelector(state => state.shopCart)
    const { user } = useSelector(state => state.auth)
    const { approvalURL } = useSelector(state => state.shopOrder)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isPaymentStart, setIsPaymentStart] = useState(false)
    const [isCODPaymentStart, setCODIsPaymentStart] = useState(false)
    const dispatch = useDispatch()

    const totalCartAmout = cartItems && cartItems.items && cartItems.items.length > 0 ?
        cartItems.items.reduce((sum, item) => sum + (item?.salePrice > 0 ? item.salePrice : item.price) * item?.quantity, 0) : 0


    const handlePaypalPayment = () => {

        if (cartItems.length === 0) {
            toast({
                title: 'Your cart is empty. Please add items to proceed',
                variant: 'destructive'
            });
            return
        }
        if (selectedAddress === null) {
            toast({
                title: 'Please select one address to proceed',
                variant: 'destructive'
            });
            return
        }

        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map((item) => ({
                productId: item?.productId,
                image: item?.image,
                title: item?.title,
                price: item?.salePrice > 0 ? item?.salePrice : item?.price,
                quantity: item?.quantity
            })),
            address: {
                addressId: selectedAddress?._id,
                address: selectedAddress?.address,
                city: selectedAddress?.city,
                pincode: selectedAddress?.pincode,
                phone: selectedAddress?.phone,
                notes: selectedAddress?.notes
            },
            orderStatus: 'pending',
            paymentMethod: 'PayPal',
            paymentStatus: 'pending',
            totalAmount: totalCartAmout,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: '',
            payerId: ''
        }
        dispatch(createNewOrder(orderData)).then(data => {
            if (data?.payload?.success) {
                setIsPaymentStart(true)
            } else {
                setIsPaymentStart(false)
            }

        })
    }

    const handleCODPayment = () => {
        if (cartItems.length === 0) {
            toast({
                title: 'Your cart is empty. Please add items to proceed',
                variant: 'destructive'
            });
            return
        }
        if (selectedAddress === null) {
            toast({
                title: 'Please select one address to proceed',
                variant: 'destructive'
            });
            return
        }
        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map((item) => ({
                productId: item?.productId,
                image: item?.image,
                title: item?.title,
                price: item?.salePrice > 0 ? item?.salePrice : item?.price,
                quantity: item?.quantity
            })),
            address: {
                addressId: selectedAddress?._id,
                address: selectedAddress?.address,
                city: selectedAddress?.city,
                pincode: selectedAddress?.pincode,
                phone: selectedAddress?.phone,
                notes: selectedAddress?.notes
            },
            orderStatus: 'pending',
            paymentMethod: 'COD',
            paymentStatus: 'pending',
            totalAmount: totalCartAmout,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: '',
            payerId: ''
        }
        dispatch(createNewOrder(orderData)).then(data => {
            if (data?.payload?.success) {
                setCODIsPaymentStart(true)
                window.location.href = '/shop/paypal-return'

            } else {
                setCODIsPaymentStart(false)
            }

        })
    }


    if (approvalURL) {
        window.location.href = approvalURL
    }

    return (
        <div className='flex flex-col'>
            <div className='relative h-[300px] w-full overflow-hidden'>
                <img src={assets.account} alt="" className='w-full object-cover object-center' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 my-10 px-10'>
                <Address setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />
                <div className='flex flex-col gap-4'>
                    {
                        cartItems && cartItems.items && cartItems.items.length > 0 ?
                            cartItems.items.map((item, index) => (<UserCartItemsContent cartItem={item} key={index} />)) : null
                    }
                    <div className='mt-8 space-y-4'>
                        <div className='flex justify-between'>
                            <span className='font-bold'>Total</span>
                            <span className='font-bold'>${totalCartAmout.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='mt-4 w-full flex items-center gap-4'>
                        <Button onClick={handlePaypalPayment}>{isPaymentStart
                            ? "Processing Paypal Payment..."
                            : "PayPal"}
                        </Button>
                        <Button onClick={handleCODPayment}>{isCODPaymentStart
                            ? "Processing COD Payment..."
                            : "Cash on Delivery"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ShoppingCheckOut
