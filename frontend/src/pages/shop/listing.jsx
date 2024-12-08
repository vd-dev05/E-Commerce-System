import ProductFilter from '@/components/shop/filter'
import ShoppingProductCard from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { toast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cart-slice'
import { fetchAllFilteredProducts, } from '@/store/shop-slice/products-slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(',')
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    return queryParams.join('&')
}


const ShoppingListing = () => {

    const { products } = useSelector(state => state.shopProducts)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const categorySearchParam = searchParams.get('category')

    const handleSort = (value) => {
        setSort(value)
    }


    const handleFilter = (id, option) => {

        let copyFilters = { ...filters }
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(id);

        if (indexOfCurrentSection === -1) {
            copyFilters = {
                ...copyFilters,
                [id]: [option]
            }
        } else {
            const indexOfCurrentOption = copyFilters[id].indexOf(option)
            if (indexOfCurrentOption === -1) {
                copyFilters[id].push(option)
            } else {
                copyFilters[id].splice(indexOfCurrentOption, 1)
            }
        }

        setFilters(copyFilters)
        sessionStorage.setItem('filters', JSON.stringify(copyFilters))
    }

    const handleAddToCart = (productId) => {

        dispatch(addToCart({
            userId: user?.id,
            productId: productId,
            quantity: 1
        })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: 'Successfully added to the cart.'
                })
            } else {
                toast({
                    title: 'Please log in to make a purchase.'
                })
            }
        }
        )
    }

    useEffect(() => {
        setSort('default')
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [categorySearchParam])

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQuery = createSearchParamsHelper(filters)
            setSearchParams(new URLSearchParams(createQuery))
        }
    }, [filters])

    useEffect(() => {
        if (filters !== null && sort !== null)
            dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }))
    }, [dispatch, sort, filters])

    return (
        <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 '>
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className='bg-background w-full rounded-lg shadow-sm'>
                <div className='p-4 flex items-center justify-between'>
                    <h2 className='text-2xl font-semibold'>All Products</h2>
                    <div className='flex items-center gap-4'>
                        <span className='text-muted-foreground'>{products.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center">
                                    <ArrowUpDown size={4} />
                                    Sort by
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-50">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                                    {
                                        sortOptions.map(item => (
                                            <DropdownMenuRadioItem key={item.id} value={item.id}>
                                                {item.label}
                                            </DropdownMenuRadioItem>
                                        ))
                                    }
                                </DropdownMenuRadioGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 p-4'>
                    {
                        products && products.length > 0 ? (
                            products.map((product, index) => (
                                <ShoppingProductCard product={product} key={index} handleAddToCart={handleAddToCart} />
                            ))
                        ) : (
                            <div className='flex items-center justify-center'>
                                <p className='text-2xl'>Product Not Found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ShoppingListing
