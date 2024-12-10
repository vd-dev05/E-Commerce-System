import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'


const ShoppingProductCard = ({ product }) => {

    return (
        <div className='text-gray-700 cursor-pointer rounded-xl border border-gray-300 overflow-hidden relative'>
            <Link to={`/shop/listing/${product?._id}`}>
                <div className='relative overflow-hidden'>
                    <img src={product?.image} alt="" className='hover:scale-110 transition ease-in-out' />
                    {
                        product?.totalStock === 0 ? (
                            <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-800">Out Of Stock</Badge>
                        ) : product?.totalStock < 10 ? (
                            <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-800">{`Only ${product?.totalStock} items left`}</Badge>
                        ) : null

                    }
                    {
                        product?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800">Sale</Badge>
                        ) : null
                    }
                </div>
                <div className='flex items-center px-4 py-2 gap-2'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-sm font-medium'>{product.title}</p>
                        <div className='flex items-center gap-6'>
                            <p className={`${product.salePrice > 0 ? 'line-through text-gray-400' : ""} text-base font-normal`}>${product.price}</p>
                            <p className={`${product.salePrice > 0 ? "text-base font-bold" : 'hidden'}`}>${product.salePrice}</p>
                        </div>
                    </div>
                </div>
            </Link>
            {/* {
                product?.totalStock === 0 ? (
                    <Button className='absolute right-4 bottom-4 opacity-60 cursor-not-allowed bg-gray-500' onClick={() => handleAddToCart(product._id)}>
                        <ShoppingCart size={16} />
                    </Button>
                ) : (
                    <Button className='absolute right-4 bottom-4' onClick={() => handleAddToCart(product._id)}>
                        <ShoppingCart size={16} />
                    </Button>
                )
            } */}
        </div>

    )
}

export default ShoppingProductCard
