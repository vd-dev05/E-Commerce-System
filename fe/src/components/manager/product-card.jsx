import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductByManager, fetchAllProductDetailsByManager, fetchAllProductsByManager, resetProductDetails } from '@/store/manager/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import ManagerProductDetails from './product-detail';
import { OctagonAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

const ManagerProductCard = ({ product }) => {

    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useDispatch();
    const { productDetails } = useSelector(state => state.managerProduct);

    const handleOpenDetails = ({ managerId, productId }) => {
        dispatch(fetchAllProductDetailsByManager({ managerId, productId }));
        setOpenDetails(true);
    };
    const handleDelete = async ({ managerId, productId }) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            dispatch(deleteProductByManager({ managerId, productId })).then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: 'Xóa thành công!',
                        description: 'Sản phẩm đã được xóa thành công!',
                    })
                    dispatch(fetchAllProductsByManager(product.managerId));

                }
            });
        }
    };

    return (
        <div className='text-gray-700 cursor-pointer rounded-xl border border-gray-300 overflow-hidden relative'>
            <div>
                <div className='relative overflow-hidden'>
                    <img src={product?.images?.mainImage} alt="" className='hover:scale-110 transition ease-in-out' />
                    {product?.totalStock === 0 ? (
                        <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-800">Hết Hàng</Badge>
                    ) : product?.totalStock < 10 ? (
                        <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-800">{`Còn ${product?.totalStock} sản phẩm`}</Badge>
                    ) : null}
                    {product.salePrice > 0 ? (
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800">Giảm giá</Badge>
                    ) : null}
                </div>
                <div className='flex items-center px-4 py-2 gap-2'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex items-center justify-between'>
                            <p className='text-lg font-medium'>{product.name}</p>
                            <div onClick={() => handleOpenDetails({ managerId: product.managerId, productId: product._id })}
                                className='flex items-center gap-2 text-gray-400 hover:text-gray-700'>
                                <p className='text-sm'>Chi tiết</p>
                                <OctagonAlert />
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className={`${product.salePrice > 0 ? 'line-through text-gray-400' : ""} text-base font-normal`}>${product.price}</p>
                            <p className={`${product.salePrice > 0 ? "text-base font-bold" : 'hidden'}`}>${product.salePrice}</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-4 pb-2'>
                    <Button onClick={() => handleDelete({ managerId: product.managerId, productId: product._id })} className="bg-red-600 hover:bg-red-800">
                        Xóa
                    </Button>
                    <Button>Cập nhật</Button>
                </div>
                <Dialog open={openDetails} onOpenChange={() => {
                    setOpenDetails(false);
                    dispatch(resetProductDetails());
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
                        </DialogHeader>
                        {productDetails ? <ManagerProductDetails productDetails={productDetails} /> : <p>Đang tải...</p>}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ManagerProductCard;
