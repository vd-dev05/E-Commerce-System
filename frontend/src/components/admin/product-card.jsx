import React from 'react'
// import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Pencil, X } from 'lucide-react'

const ProductCard = ({ products, setOpen, setFormData, setEditedId, setUploadImageUrl, handleDelete }) => {
    return (
        <div>
            <p className='my-4 text-2xl'>All Products List</p>
            <div className='flex flex-col gap-2'>
                <div className='hidden md:grid grid-cols-[0.5fr_1fr_2fr_0.5fr_1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>#</b>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Brand</b>
                    <b>Sub Category</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Sale Price</b>
                    <b>Stocks</b>
                    <b className='text-center'>Action</b>
                </div>
            </div>
            {
                products.map((item, index) => (
                    <div key={index} className='grid grid-cols[1fr_3fr_1fr] md:grid grid-cols-[0.5fr_1fr_2fr_0.5fr_1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] items-center py-1 px-2 border-b-2 text-sm'>
                        <p className='font-semibold'>{index + 1}</p>
                        <img className='w-20' src={item?.image} alt="" />
                        <p className='text-base'>{item?.title}</p>
                        <p>{item?.brand}</p>
                        <p>{item?.subCategory}</p>
                        <p>{item?.category}</p>
                        <p className={`${item.salePrice > 0 ? "line-through text-gray-400" : "font-bold"}`}>${item?.price}</p>
                        <p className={`${item.salePrice <= 0 ? "text-gray-400" : "font-bold"}`}>${item?.salePrice}</p>
                        <p>{item?.totalStock}</p>
                        <div className='flex items-center gap-2 justify-center'>
                            <Button className="size-10"
                                onClick={() => {
                                    setOpen(true);
                                    setEditedId(item?._id);
                                    setFormData(item);
                                    setUploadImageUrl(item.image)
                                }}
                            > <Pencil />
                            </Button>
                            <Button className="size-10" onClick={() => handleDelete(item._id)}>
                                <X />
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductCard
