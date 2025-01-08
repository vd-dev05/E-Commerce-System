import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { createCategory, deleteCategory, fetchCategory, updateCategory } from '@/store/manager/category'
import { Pencil, Plus, X } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ManagerCategory = () => {

    const [formData, setFormData] = useState({
        code: '',
        category_name: ''
    })
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(null)

    const dispatch = useDispatch()
    const { toast } = useToast()
    const { categoryItems } = useSelector(state => state.managerCategory)
    const { manager } = useSelector(state => state.managerAuth)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            dispatch(updateCategory({
                managerId: manager?.id,
                code: formData?.code,
                category_name: formData?.category_name,
            })).then((data) => {
                if (data?.payload?.success) {
                    toast({ title: data?.payload?.message });
                    dispatch(fetchCategory(manager?.id));
                    setIsEdit(null);
                    setOpen(false);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Cập nhật thất bại!',
                        description: data?.payload?.message,
                    });
                }
            });
        } else {
            dispatch(createCategory({
                managerId: manager?.id,
                items: {
                    code: formData?.code,
                    category_name: formData?.category_name,
                },
            })).then((data) => {
                if (data?.payload?.success) {
                    toast({ title: data?.payload?.message });
                    setOpen(false);
                    dispatch(fetchCategory(manager?.id));
                    setFormData({ code: '', category_name: '' });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Thêm mới thất bại!',
                        description: data?.payload?.message,
                    });
                }
            });
        }
    }
    const handleDelete = (code) => {
        dispatch(deleteCategory({
            managerId: manager?.id,
            code
        })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCategory(manager?.id))
                toast({
                    title: data?.payload?.message
                })
            }
        })
    }

    const handleEdit = (category) => {
        setIsEdit(category.code);
        setFormData({
            code: category.code,
            category_name: category.category_name
        })
        setOpen(true)
    }
    useEffect(() => {
        dispatch(fetchCategory(manager?.id))
    }, [dispatch, manager?.id])

    return (
        <Fragment>
            <div className='flex items-center w-full justify-between mb-8'>
                <h1 className='text-2xl font-semibold'>
                    Danh Mục Sản Phẩm
                </h1>
                <Button className="flex items-center gap-1 bg-blue-600" onClick={() => setOpen(true)}><Plus />Thêm mới</Button>
                <Dialog open={open} onOpenChange={() => {
                    setOpen(false);
                    setFormData({
                        code: '',
                        category_name: ''
                    })
                    setIsEdit(null)
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEdit ? 'Cập nhập danh mục' : 'Thêm mới danh mục'}</DialogTitle>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Mã Danh Mục
                                </Label>
                                <Input
                                    id="code"
                                    className={`col-span-3`}
                                    placeholder='VD:N01'
                                    name='code'
                                    value={formData.code}
                                    onChange={handleChange}
                                    disabled={isEdit}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Tên Danh Mục
                                </Label>
                                <Input
                                    id="category_name"
                                    className="col-span-3"
                                    placeholder='VD:Nam'
                                    name='category_name'
                                    value={formData.category_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit">{isEdit ? 'Lưu' : 'Thêm'}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Table className='w-2/3 mx-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Mã danh mục</TableHead>
                        <TableHead>Tên danh mục</TableHead>
                        <TableHead>Chức năng</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        categoryItems && categoryItems.length > 0 ? (
                            categoryItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{item?.code}</TableCell>
                                    <TableCell>{item?.category_name}</TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Button className="size-10 bg-yellow-500" onClick={() => { handleEdit(item) }}>
                                            <Pencil />
                                        </Button>
                                        <Button className="size-10 bg-red-600" onClick={() => handleDelete(item?.code)}>
                                            <X />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center">
                                    Không có danh mục nào
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>


        </Fragment>
    )
}

export default ManagerCategory
