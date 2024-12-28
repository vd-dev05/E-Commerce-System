import ProductImageUpload from '@/components/admin/image'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { createProduct, fetchAllProducts, removeProduct, updateProduct } from '@/store/admin-slice/product-slice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '@/components/admin/product-card'

const AdminProducts = () => {

    const [formData, setFormData] = useState({
        image: null,
        title: '',
        description: '',
        subCategory: '',
        category: '',
        brand: '',
        price: '',
        salePrice: '',
        totalStock: ''
    })
    const [open, setOpen] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [uploadImageUrl, setUploadImageUrl] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [editedId, setEditedId] = useState(null)
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.adminProducts)
    const { toast } = useToast()


    const onSubmit = (e) => {
        e.preventDefault();
        if (editedId !== null) {
            dispatch(updateProduct({
                id: editedId, formData: {
                    ...formData,
                    image: uploadImageUrl
                }
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setOpen(false);
                    setImageFile(null)
                    setFormData({
                        image: null,
                        title: '',
                        description: '',
                        subCategory: '',
                        category: '',
                        brand: '',
                        price: '',
                        salePrice: '',
                        totalStock: ''
                    })
                    toast({
                        title: data?.payload?.message
                    })
                }
            })
        } else {
            dispatch(createProduct({
                ...formData,
                image: uploadImageUrl
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts())
                    setImageFile(null)
                    setUploadImageUrl(null)
                    setFormData({
                        image: null,
                        title: '',
                        description: '',
                        subCategory: '',
                        category: '',
                        brand: '',
                        price: '',
                        salePrice: '',
                        totalStock: ''
                    })
                    toast({
                        title: data.payload.message
                    })
                    setOpen(false)
                }
            })
        }
    }
    const handleDelete = (id) => {
        dispatch(removeProduct(id)).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts())
                toast({
                    title: data?.payload?.message
                })
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    return (
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpen(true)}>Add New Product</Button>
            </div>
            <div>
                {
                    products && products.length > 0 ?
                        <ProductCard products={products}
                            setOpen={setOpen}
                            setFormData={setFormData}
                            setEditedId={setEditedId}
                            setUploadImageUrl={(url) => setUploadImageUrl(url)}
                            handleDelete={handleDelete} /> : null
                }
            </div>
            <Sheet open={open} onOpenChange={() => {
                setOpen(false);
                setEditedId(null);
                setImageFile(null)
                setUploadImageUrl(null)
                setFormData({
                    image: null,
                    title: '',
                    description: '',
                    subCategory: '',
                    category: '',
                    brand: '',
                    price: '',
                    salePrice: '',
                    totalStock: ''
                })
            }}>
                <SheetContent side='right' className='overflow-auto'>
                    <SheetHeader>
                        <SheetTitle>
                            {
                                editedId !== null ? 'Edit Product' : 'Add New Product'
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <div className='py-6'>
                        <ProductImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadImageUrl={uploadImageUrl}
                            setUploadImageUrl={setUploadImageUrl}
                            setImageLoading={setImageLoading}
                            imageLoading={imageLoading}
                            editedId={editedId}
                            isEditMode={editedId !== null}
                        />
                        <CommonForm
                            formData={formData}
                            formControls={addProductFormElements}
                            buttonText={editedId !== null ? "Save" : "Add Product"}
                            setFormData={setFormData}
                            onSubmit={onSubmit}
                        />

                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts
