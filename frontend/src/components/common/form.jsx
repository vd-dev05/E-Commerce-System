import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {

    const renderInputsByComponentType = (item) => {
        let element = null;
        const value = formData[item.name] || ''

        switch (item.componentType) {
            case 'input':
                element = (
                    <Input
                        name={item.name}
                        placeholder={item.placeholder}
                        id={item.name}
                        type={item.type}
                        value={value}
                        onChange={e => setFormData({
                            ...formData,
                            [item.name]: e.target.value
                        })}
                    />
                )
                break;
            case 'select':
                element = (
                    <Select
                        onValueChange={(value) => setFormData({
                            ...formData,
                            [item.name]: value,
                        })}
                        value={value}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={item.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                item.options &&
                                    item.options.length > 0
                                    ? item.options.map(option => <SelectItem key={option.id} value={option.id}>
                                        {option.label}
                                    </SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case 'textarea':
                element = (
                    <Textarea
                        name={item.name}
                        placeholder={item.placeholder}
                        id={item.name}
                        value={value}
                        onChange={e => setFormData({
                            ...formData,
                            [item.name]: e.target.value
                        })}
                    />
                )
                break;

            default:
                element = (<Input
                    name={item.name}
                    placeholder={item.placeholder}
                    id={item.name}
                    type={item.type}
                />)
                break;
        }
        return element
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map((item) => (<div className='grid w-full gap-2' key={item.name}>
                        <Label htmlFor="" className='mb-1'>{item.label}</Label>
                        {
                            renderInputsByComponentType(item)
                        }
                    </div>
                    ))
                }
            </div>
            <Button className='mt-6 w-full' type="submit">{buttonText || 'Submit'}</Button>

        </form>
    )
}

export default CommonForm
