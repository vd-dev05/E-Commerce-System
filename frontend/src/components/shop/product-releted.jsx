import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/admin-slice/product-slice';
import ShoppingProductCard from './product-card';

const ShoppingProductReleted = ({ category, subCategory, brand, productId }) => {

    const { products } = useSelector(state => state.adminProducts);
    const [releted, setReleted] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => category === item.category && productId !== item._id)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory || brand === item.brand)
            setReleted(productsCopy.slice(0, 5))
        }
    }, [products, category, subCategory, brand, productId])

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products])

    return (
        <div className='my-20 mx-10'>
            <div className='text-center text-3xl py-2'>
                <h3 className='mb-10 font-semibold'>
                    Releted Products
                </h3>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    releted.map((item, index) => (
                        <ShoppingProductCard product={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default ShoppingProductReleted
