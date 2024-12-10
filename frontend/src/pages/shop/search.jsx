import { Input } from '@/components/ui/input'
import { getSearchProducts } from '@/store/shop-slice/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {

    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { searchResults } = useSelector(state => state.search)

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchProducts(keyword))
            }, 1000)
        }
    }, [keyword])



    console.log(searchResults, 'search');


    return (
        <div className='container mx-auto md:px-̉6 px-4 py-8'>
            <div className='flex justify-center mb-8'>
                <div className='w-full flex items-center'>
                    <Input className='px-6 py-6' placeholder='Search products...'
                        value={keyword} onChange={(e) => setKeyword(e.target.value)}
                    />

                </div>
            </div>
        </div>
    )
}

export default SearchProducts
