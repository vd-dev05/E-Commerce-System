import ProductImageUpload from '@/components/manager/image'
import ManagerProductCard from '@/components/manager/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { categoryList } from '@/config'
import { toast } from '@/hooks/use-toast'
import { fetchCategory } from '@/store/manager/category'
import { createProduct, fetchAllProductsByManager } from '@/store/manager/product'
import { Plus } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ManagerProduct = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        price: "",
        currency: "",
        salePrice: "",
        totalStock: "",
        images: null,
        attributes: {}
    })


    const [attributes, setAttributes] = useState([
        {
            title: "", options: [{
                name: "", quantity: "", subAttribute: {
                    title: "", options: [{
                        name: "", quantity: ""
                    }]
                }
            }]
        }
    ]);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const { categoryItems } = useSelector(state => state.managerCategory)
    const { manager } = useSelector(state => state.managerAuth)
    const { productItems } = useSelector(state => state.managerProduct)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericValue = name === "price" || name === "salePrice" ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: numericValue,
        }));
    };

    const handleAddAttributes = () => {
        setAttributes([...attributes, {
            title: "", options: [{
                name: "", quantity: "", subAttribute: {
                    title: "", options: [{
                        name: "", quantity: ""
                    }]
                }
            }]
        }]);
    };

    const handleRemoveAttribute = (index) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const handleAddOption = (index) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[index].options.push({ name: "", quantity: "", subAttribute: { title: "", options: [{ name: "", quantity: "" }] } });
        setAttributes(updatedAttributes);
    };

    const handleRemoveOption = (attributeIndex, optionIndex) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[attributeIndex].options = updatedAttributes[attributeIndex].options.filter((_, i) => i !== optionIndex);
        setAttributes(updatedAttributes);
    };

    const handleAttributeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedAttributes = [...attributes];
        updatedAttributes[index][name] = value;
        setAttributes(updatedAttributes);
    };

    const handleOptionChange = (attributeIndex, optionIndex, event) => {
        const { name, value } = event.target;
        const updatedAttributes = [...attributes];
        updatedAttributes[attributeIndex].options[optionIndex][name] = value;
        setAttributes(updatedAttributes);
    };

    const handleSubAttributeChange = (attributeIndex, optionIndex, event) => {
        const { name, value } = event.target;
        const updatedAttributes = [...attributes];
        updatedAttributes[attributeIndex].options[optionIndex].subAttribute[name] = value;
        setAttributes(updatedAttributes);
    };

    const handleAddSubOption = (attributeIndex, optionIndex) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[attributeIndex].options[optionIndex].subAttribute.options.push({ name: "", quantity: "" });
        setAttributes(updatedAttributes);
    };

    const handleRemoveSubOption = (attributeIndex, optionIndex, subIndex) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[attributeIndex].options[optionIndex].subAttribute.options = updatedAttributes[attributeIndex].options[optionIndex].subAttribute.options.filter((_, i) => i !== subIndex);
        setAttributes(updatedAttributes);
    };

    const handleSubOptionChange = (attributeIndex, optionIndex, subIndex, event) => {
        const { name, value } = event.target;
        const updatedAttributes = [...attributes];
        updatedAttributes[attributeIndex].options[optionIndex].subAttribute.options[subIndex][name] = value;
        setAttributes(updatedAttributes);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct({
            ...formData,
            managerId: manager?.id,
            images: uploadImageUrl,
            attributes: attributes
        })).then((data) => {
            if (data?.payload?.success) {
                toast({ title: data?.payload?.message });
                setFormData({
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                    salePrice: "",
                    totalStock: "",
                    images: null,
                })
                setMainImage(null)
                setAdditionalImages([])
                setUploadImageUrl(null)
                setAttributes([{
                    title: "", options: [{
                        name: "", quantity: "", subAttribute: {
                            title: "", options: [{
                                name: "", quantity: ""
                            }]
                        }
                    }]
                }])
                setOpen(false)
                dispatch(fetchCategory(manager?.id))
                toast({
                    title: 'Thêm mới thành công!',
                    description: 'Sản phẩm đã được thêm thành công!',
                })
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Thêm mới thất bại!',
                    description: data?.payload?.message,
                });
            }
        })
    }
    useEffect(() => {
        dispatch(fetchAllProductsByManager(manager?.id))
    }, [dispatch, manager?.id])

    useEffect(() => {
        dispatch(fetchCategory(manager?.id))
    }, [dispatch, manager?.id])

    return (
        <Fragment>
            <div className='flex items-center w-full justify-between mb-8'>
                <h1 className='text-2xl font-semibold'>
                    Danh Sách Sản Phẩm
                </h1>
                <Button className="flex items-center gap-1 bg-blue-600" onClick={() => setOpen(true)}><Plus />Thêm mới</Button>
            </div>
            <Sheet open={open}
                onOpenChange={() => {
                    setOpen(false)
                    setFormData({
                        name: "",
                        description: "",
                        category: "",
                        price: "",
                        salePrice: "",
                        totalStock: "",
                        images: null,
                    })
                    setMainImage(null)
                    setAdditionalImages([])
                    setUploadImageUrl(null)
                    setAttributes([{
                        title: "", options: [{
                            name: "", quantity: "", subAttribute: {
                                title: "", options: [{
                                    name: "", quantity: ""
                                }]
                            }
                        }]
                    }])
                }}

            >
                <SheetContent side='bottom' className="h-full overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Thêm mới sản phẩm</SheetTitle>
                    </SheetHeader>
                    <div className='flex gap-4 w-full items-start justify-between'>
                        <ProductImageUpload
                            additionalImages={additionalImages}
                            setAdditionalImages={setAdditionalImages}
                            mainImage={mainImage}
                            setMainImage={setMainImage}
                            uploadImageUrl={uploadImageUrl}
                            setUploadImageUrl={setUploadImageUrl}
                            imageLoading={imageLoading}
                            setImageLoading={setImageLoading}
                        />
                        <form className="py-4 w-2/3" onSubmit={handleSubmit} >
                            <p className='pb-8 font-semibold'>Thông tin sản phẩm</p>
                            <div className='flex flex-col gap-3 px-10'>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Tên sản phẩm</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Nhập tên sản phẩm"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Mô tả sản phẩm</Label>
                                    <Textarea
                                        name="description"
                                        placeholder="Nhập mô tả sản phẩm"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Danh mục sản phẩm</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                        <SelectTrigger className='w-full bg-gray-200'>
                                            <SelectValue placeholder="Chọn danh mục sản phẩm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                categoryItems && categoryItems.length > 0
                                                    ? categoryItems.map((option, index) => <SelectItem key={index} value={option.category_name}>
                                                        {option.category_name}
                                                    </SelectItem>) : null
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='grid w-full gap-2'>
                                    <Label htmlFor="" className='mb-1'>Danh mục sản phẩm</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, subCategory: value })}>
                                        <SelectTrigger className='w-full bg-gray-200'>
                                            <SelectValue placeholder="Danh sách sản phẩm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoryList.map((option) => (
                                                <SelectItem key={option.id} value={option.label}>
                                                    {option.path}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Giá sản phẩm</Label>
                                    <Input
                                        type="number"
                                        name="price"
                                        placeholder="Nhập giá sản phẩm"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Giá giảm sản phẩm</Label>
                                    <Input
                                        type="number"
                                        name="salePrice"
                                        placeholder="Nhập giá giảm sản phẩm"
                                        value={formData.salePrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Label htmlFor="" className='mb-1'>Loại tiền tệ</Label>
                                <Select onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                                    <SelectTrigger className='w-full bg-gray-200'>
                                        <SelectValue placeholder="Chọn loại tiền tệ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="VND">VND</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                    </SelectContent>
                                </Select>
                                {
                                    attributes.length <= 0 ? <div className='grid w-full gap-2' >
                                        <Label htmlFor="" className='mb-1'>Số lượng sản phẩm</Label>
                                        <Input
                                            type="text"
                                            name="totalStock"
                                            placeholder="Nhập số lượng sản phẩm"
                                            value={formData.totalStock}
                                            onChange={handleChange}
                                        />
                                    </div> : null
                                }
                                <p className='pb-4 font-semibold'>Phân loại sản phẩm</p>
                                <div className='flex flex-col gap-6'>
                                    {attributes.length > 0 && attributes.map((attribute, index) => (
                                        <div key={index} className='border rounded p-4'>
                                            {/* Tiêu đề phân loại */}
                                            <div className='flex items-center gap-2 mb-4'>
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    placeholder={`Tiêu đề phân loại`}
                                                    value={attribute.title}
                                                    onChange={(e) => handleAttributeChange(index, e)}
                                                />
                                                <Button
                                                    type="button"
                                                    className="bg-red-500 text-white"
                                                    onClick={() => handleRemoveAttribute(index)}
                                                >
                                                    Xoá phân loại
                                                </Button>
                                            </div>

                                            {/* Tuỳ chọn của phân loại */}
                                            <div className='flex flex-col gap-2'>
                                                {attribute.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className='border p-2 rounded'>
                                                        <div className='flex items-center gap-2'>
                                                            <Input
                                                                type="text"
                                                                name="name"
                                                                placeholder={`Tên tuỳ chọn ${optionIndex + 1}`}
                                                                value={option.name}
                                                                onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                                            />
                                                            {
                                                                option.subAttribute.options.length <= 0 && <Input
                                                                    type="number"
                                                                    name="quantity"
                                                                    placeholder="Số lượng"
                                                                    min="0"
                                                                    value={option.quantity}
                                                                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                                                />
                                                            }

                                                            <Button
                                                                type="button"
                                                                className="bg-red-500 text-white"
                                                                onClick={() => handleRemoveOption(index, optionIndex)}
                                                            >
                                                                Xoá
                                                            </Button>
                                                        </div>

                                                        {/* Thuộc tính con của tùy chọn */}
                                                        <div className='ml-6 mt-2'>
                                                            <Input
                                                                type="text"
                                                                name="title"
                                                                placeholder="Tiêu đề thuộc tính con"
                                                                value={option.subAttribute.title}
                                                                onChange={(e) => handleSubAttributeChange(index, optionIndex, e)}
                                                            />


                                                            {option.subAttribute.options.map((subOption, subIndex) => (
                                                                <div key={subIndex} className='flex items-center gap-2 mt-2'>
                                                                    <Input
                                                                        type="text"
                                                                        name="name"
                                                                        placeholder={`Tên thuộc tính con ${subIndex + 1}`}
                                                                        value={subOption.name}
                                                                        onChange={(e) => handleSubOptionChange(index, optionIndex, subIndex, e)}
                                                                    />
                                                                    <Input
                                                                        type="number"
                                                                        name="quantity"
                                                                        placeholder="Số lượng"
                                                                        min="0"
                                                                        value={subOption.quantity}
                                                                        onChange={(e) => handleSubOptionChange(index, optionIndex, subIndex, e)}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        className="bg-red-500 text-white"
                                                                        onClick={() => handleRemoveSubOption(index, optionIndex, subIndex)}
                                                                    >
                                                                        Xoá
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <div className='flex justify-end mt-2'>
                                                                <Button
                                                                    type="button"
                                                                    className="bg-blue-500 text-white"
                                                                    onClick={() => handleAddSubOption(index, optionIndex)}
                                                                >
                                                                    Thêm thuộc tính con
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className='flex justify-end'>
                                                    <Button
                                                        type="button"
                                                        className="bg-blue-500 text-white"
                                                        onClick={() => handleAddOption(index)}
                                                    >
                                                        Thêm tuỳ chọn
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex justify-end'>
                                        {
                                            attributes.length === 1 ? null : <Button
                                                type="button"
                                                className="bg-green-500 text-white"
                                                onClick={handleAddAttributes}
                                            >
                                                Thêm phân loại
                                            </Button>
                                        }

                                    </div>
                                </div>


                            </div>

                            <Button className='mt-6 w-full' type="submit">Thêm</Button>


                        </form>
                    </div>

                </SheetContent>
            </Sheet>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 p-4'>
                {
                    productItems && productItems.length > 0 ? (
                        productItems.map((product, index) => (
                            <ManagerProductCard product={product} key={index} />

                        ))
                    ) : (
                        <div className='flex items-center justify-center'>
                            <p className='text-2xl'>Không Có Sản Phẩm</p>
                        </div>
                    )
                }
            </div>

        </Fragment >
    )
}

export default ManagerProduct
