import { filterOptions } from '@/config'
import { Label } from '@radix-ui/react-label'
import React, { Fragment } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = ({ filters, handleFilter }) => {
    return (
        <div className='bg-background rounded-lg shadow-sm'>
            <div className='p-4 border-b'>
                <h2 className='text-xl font-bold'>Filters</h2>

            </div>
            <div className='p-4 space-y-4'>
                {
                    Object.keys(filterOptions).map((items, index) => (
                        <Fragment key={index}>
                            <div>
                                <h3 className='text-base font-semibold uppercase'>{items}</h3>
                                <div className='grid gap-2 mt-2'>
                                    {
                                        filterOptions[items].map((item, index) => (
                                            <Label className='flex items-center gap-2 font-light' key={index}>
                                                <Checkbox
                                                    checked={
                                                        filters &&
                                                        Object.keys(filters).length > 0 &&
                                                        filters[items] &&
                                                        filters[items].indexOf(item.id) > -1
                                                    }
                                                    onCheckedChange={() => handleFilter(items, item.id)}
                                                />
                                                {item.label}
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                            <Separator />
                        </Fragment>
                    ))
                }
            </div>

        </div>
    )
}

export default ProductFilter
