
import { getAllOrder } from '@/store/admin-slice/order-slice';
import { fetchAllProducts } from '@/store/admin-slice/product-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminDashBoard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.adminProducts);
    const { orderList } = useSelector((state) => state.adminOrder);

    useEffect(() => {

        dispatch(fetchAllProducts());
        dispatch(getAllOrder());
    }, [dispatch]);

    const totalRevenue = orderList?.reduce(
        (sum, order) => sum + (order?.totalAmount || 0),
        0
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="border border-gray-300 p-4 rounded-md shadow-md bg-white">
                    <h2 className="text-lg font-semibold">Total Products</h2>
                    <p className="text-2xl font-bold mt-4">{products?.length || 0}</p>
                </div>


                <div className="border border-gray-300 p-4 rounded-md shadow-md bg-white">
                    <h2 className="text-lg font-semibold">Total Orders</h2>
                    <p className="text-2xl font-bold mt-4">{orderList?.length || 0}</p>
                </div>


                <div className="border border-gray-300 p-4 rounded-md shadow-md bg-white">
                    <h2 className="text-lg font-semibold">Total Revenue</h2>
                    <p className="text-2xl font-bold mt-4">
                        ${totalRevenue?.toFixed(2) || '0.00'}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default AdminDashBoard
