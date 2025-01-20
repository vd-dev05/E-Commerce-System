import ProductImageUpload from '@/components/manager/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { fetchCategory } from '@/store/manager/category'
import { Plus } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ManagerProduct = () => {

    const [categories, setCategories] = useState([
        { name: "", values: [{ name: "", quantity: "" }] },
    ]);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const { categoryItems } = useSelector(state => state.managerCategory)
    const { manager } = useSelector(state => state.managerAuth)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)


    const handleAddCategory = () => {
        setCategories([...categories, { name: "", values: [""] }]);
    };
    const handleCategoryNameChange = (index, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index].name = value;
        setCategories(updatedCategories);
    };
    const handleRemoveCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };
    const handleAddValue = (categoryIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].values.push({ name: "", quantity: "" });
        setCategories(updatedCategories);
    };

    const handleValueChange = (categoryIndex, valueIndex, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].values[valueIndex][field] = field === "quantity" ? +value : value;
        setCategories(updatedCategories);
    };

    const handleRemoveValue = (categoryIndex, valueIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].values = updatedCategories[categoryIndex].values.filter((_, i) => i !== valueIndex);
        setCategories(updatedCategories);
    };

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
                    setCategories([{ name: "", values: [{ name: "", quantity: "" }] }])
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
                        <form className="py-4 w-2/3" >
                            <p className='pb-8 font-semibold'>Thông tin sản phẩm</p>
                            <div className='flex flex-col gap-3 px-10'>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Tên sản phẩm</Label>
                                    <Input
                                        type="text"
                                        placeholder='Nhập tên sản phẩm'
                                    />
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Mô tả sản phẩm</Label>
                                    <Textarea

                                        placeholder='Nhập mô tả sản phẩm'
                                    />
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Danh mục sản phẩm</Label>
                                    <Select>
                                        <SelectTrigger className='w-full bg-gray-200'>
                                            <SelectValue placeholder="Chọn danh mục sản phẩm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                categoryItems && categoryItems.length > 0
                                                    ? categoryItems.map((option, index) => <SelectItem key={index} value={option.code}>
                                                        {option.category_name}
                                                    </SelectItem>) : null
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Giá sản phẩm</Label>
                                    <Input
                                        type="text"
                                        placeholder='Nhập giá sản phẩm'
                                    />
                                </div>
                                <div className='grid w-full gap-2' >
                                    <Label htmlFor="" className='mb-1'>Giá giảm sản phẩm</Label>
                                    <Input
                                        type="text"
                                        placeholder='Nhập giá giảm sản phẩm'
                                    />
                                </div>
                                <p className='pb-4 font-semibold'>Phân loại sản phẩm</p>
                                <div className='flex flex-col gap-6'>
                                    {categories.map((category, categoryIndex) => (
                                        <div key={categoryIndex} className='border rounded p-4'>
                                            {/* Tên phân loại */}
                                            <div className='flex items-center gap-2 mb-4'>
                                                <Input
                                                    type="text"
                                                    placeholder={`Tên phân loại ${categoryIndex + 1}`}
                                                    value={category.name}
                                                    onChange={(e) => handleCategoryNameChange(categoryIndex, e.target.value)}
                                                />
                                                <Button
                                                    type="button"
                                                    className="bg-red-500 text-white"
                                                    onClick={() => handleRemoveCategory(categoryIndex)}
                                                >
                                                    Xoá phân loại
                                                </Button>
                                            </div>

                                            {/* Giá trị của phân loại */}
                                            <div className='flex flex-col gap-2'>
                                                {category.values.map((value, valueIndex) => (
                                                    <div key={valueIndex} className='flex items-center gap-2'>
                                                        <Input
                                                            type="text"
                                                            placeholder={`Tên giá trị ${valueIndex + 1}`}
                                                            value={value.name}
                                                            onChange={(e) =>
                                                                handleValueChange(categoryIndex, valueIndex, "name", e.target.value)
                                                            }
                                                        />
                                                        <Input
                                                            type="number"
                                                            placeholder="Số lượng"
                                                            value={value.quantity}
                                                            min="0"
                                                            onChange={(e) =>
                                                                handleValueChange(categoryIndex, valueIndex, "quantity", e.target.value)
                                                            }
                                                        />
                                                        {category.values.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                className="bg-red-500 text-white"
                                                                onClick={() =>
                                                                    handleRemoveValue(categoryIndex, valueIndex)
                                                                }
                                                            >
                                                                Xoá
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className='flex justify-end'>
                                                    <Button
                                                        type="button"
                                                        className="bg-blue-500 text-white"
                                                        onClick={() => handleAddValue(categoryIndex)}
                                                    >
                                                        Thêm giá trị
                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex justify-end'>
                                        <Button
                                            type="button"
                                            className="bg-green-500 text-white"
                                            onClick={handleAddCategory}
                                        >
                                            Thêm phân loại
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            <Button className='mt-6 w-full' type="submit">Thêm</Button>


                        </form>
                    </div>

                </SheetContent>
            </Sheet>
        </Fragment >
    )
}

export default ManagerProduct
