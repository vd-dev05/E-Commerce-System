import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'

const ShoppingProductCard = ({ product, handleAddToCart }) => {

    return (
        <div className='text-gray-700 cursor-pointer rounded-xl border border-gray-300 overflow-hidden relative'>
            <Link to={`/shop/listing/${product?._id}`}>
                <div className='relative overflow-hidden'>
                    <img src={product?.image} alt="" className='hover:scale-110 transition ease-in-out' />
                    {
                        product?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800">Sale</Badge>
                        ) : null
                    }
                </div>
                <div className='flex items-center px-4 py-2 gap-2'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-lg font-medium'>{product.title}</p>
                        <div className='flex items-center gap-6'>
                            <p className={`${product.salePrice > 0 ? 'line-through text-gray-400' : ""} text-base font-normal`}>${product.price}</p>
                            <p className={`${product.salePrice > 0 ? "text-base font-bold" : 'hidden'}`}>${product.salePrice}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Button className='absolute right-4 bottom-4' onClick={() => handleAddToCart(product._id)}>
                <ShoppingCart size={16} />
            </Button>
        </div>

    )
}

export default ShoppingProductCard
