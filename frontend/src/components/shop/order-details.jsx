import React from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { DialogContent } from '../ui/dialog'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'


const ShoppingOrderDetailsView = ({ orderDetails }) => {

    const { user } = useSelector(state => state.auth)

    return (
        <DialogContent className='sm:max-w-[600px] h-full overflow-auto'>
            <div className='grid gap-6'>
                <div className='grid gap-2 gap-y-4'>
                    <div className='flex items-center justify-between mt-6'>
                        <p className='font-medium'>ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className='flex items-center justify-between '>
                        <p className='font-medium'>Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className='flex items-center justify-between '>
                        <p className='font-medium'>Price</p>
                        <Label>{orderDetails?.totalAmount.toFixed(2)}</Label>
                    </div>
                    <div className='flex items-center justify-between '>
                        <p className='font-medium'>Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className='flex items-center justify-between '>
                        <p className='font-medium'>Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className='flex items-center justify-between '>
                        <p className='font-medium'>Status</p>
                        <Label>
                            <Badge className={`px-2 py-1 ${orderDetails?.orderStatus === 'Completed' ? 'bg-green-500' : 'bg-black'}`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            <li className='grid grid-cols-[0.2fr_3fr_1fr_1fr] items-center gap-2 bg-gray-300'>
                                <span className='pl-2'>#</span>
                                <span>Name</span>
                                <span>Quantity</span>
                                <span>Price</span>
                            </li>
                            {
                                orderDetails?.cartItems.length > 0 ? (
                                    orderDetails?.cartItems.map((item, index) => (
                                        <li className='grid grid-cols-[0.2fr_3fr_1fr_1fr] items-center gap-2' key={index}>
                                            <span className='pl-2'>{index + 1}</span>
                                            <span className='flex gap-1 items-center'><img src={item?.image} alt="" className='w-16' />{item.title}</span>
                                            <span className='mx-8'>{item.quantity}</span>
                                            <span>${item.quantity * item.price}</span>
                                        </li>
                                    )
                                    )
                                ) : null
                            }
                        </ul>
                    </div>
                </div>
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>
                            Shipping Info
                        </div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>UserName: {user?.username}</span>
                            <span>Address: {orderDetails?.address?.address}</span>
                            <span>City: {orderDetails?.address?.city}</span>
                            <span>Phone: {orderDetails?.address?.phone}</span>
                            <span>Notes: {orderDetails?.address?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetailsView
