import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { createCategory } from '@/store/manager/category'
import { Plus } from 'lucide-react'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ManagerCategory = () => {

    const [formData, setFormData] = useState({
        code: '',
        category_name: ''
    })
    const [open, setOpen] = useState(false)

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
        dispatch(createCategory({
            managerId: manager.id,
            items: {
                code: formData.code,
                category_name: formData.category_name
            }
        })).then(data => {
            if (data.payload.success) {
                setOpen(false)
                toast({
                    title: data.payload.message
                })
                setFormData({
                    code: '',
                    category_name: ''
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Thêm mới thất bại",
                    description: data?.payload?.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>
                })
            }
        })

    }

    return (
        <Fragment>
            <div className='flex items-center w-full justify-between mb-8'>
                <h1 className='text-2xl font-semibold'>
                    Danh Mục Sản Phẩm
                </h1>
                <Button className="flex items-center gap-1" onClick={() => setOpen(true)}><Plus />Thêm mới</Button>
                <Dialog open={open} onOpenChange={() => {
                    setOpen(false);
                    setFormData({
                        code: '',
                        category_name: ''
                    })
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm mới danh mục</DialogTitle>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Mã Danh Mục
                                </Label>
                                <Input
                                    id="code"
                                    className="col-span-3"
                                    placeholder='VD:N01'
                                    name='code'
                                    value={formData.code}
                                    onChange={handleChange}
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
                            <Button type="submit">Thêm</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                {/* List Category */}
            </div>

        </Fragment>
    )
}

export default ManagerCategory
