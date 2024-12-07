import React, { useEffect } from 'react'
import AdminOrdersView from '@/components/admin/orders'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from '@/store/admin-slice/order-slice'

const AdminOrders = () => {
    const dispatch = useDispatch()
    const { orderList } = useSelector(state => state.adminOrder)

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    return (
        <div>
            <AdminOrdersView orderList={orderList} />
        </div>
    )
}

export default AdminOrders
