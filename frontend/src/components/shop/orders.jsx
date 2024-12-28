import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderByUser, getOrderDetails, resetOrderDetails } from '@/store/shop-slice/order-slice'
import { Badge } from '../ui/badge'

const ShoppingOrders = () => {

    const [openDetails, setOpenDetails] = useState(false)
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { orderList, orderDetails } = useSelector(state => state.shopOrder)


    const handleOrderDetails = (id) => {
        dispatch(getOrderDetails(id))
    }

    useEffect(() => {
        dispatch(getAllOrderByUser(user?.id))
    }, [dispatch])

    useEffect(() => {
        if (orderDetails !== null) {
            setOpenDetails(true)
        }
    }, [orderDetails])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>
                                <span className='sr-only'>Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                                orderList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item?._id}</TableCell>
                                        <TableCell>{item.orderDate.split('T')[0]}</TableCell>
                                        <TableCell><Badge className={`px-2 py-1 ${item?.orderStatus === 'Completed' ? 'bg-green-500' : 'bg-black'}`}>{item?.orderStatus}</Badge></TableCell>
                                        <TableCell>${item?.totalAmount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Dialog open={openDetails} onOpenChange={() => {
                                                setOpenDetails(false)
                                                dispatch(resetOrderDetails())
                                            }}>
                                                <Button onClick={() => handleOrderDetails(item?._id)}>
                                                    View
                                                </Button>
                                                <ShoppingOrderDetailsView orderDetails={orderDetails} />
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                )) : null
                        }

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ShoppingOrders
