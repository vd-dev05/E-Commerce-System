import React from 'react'

const ManagerProductDetails = ({ productDetails }) => {
    console.log(productDetails);

    return (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]'>
                        <img src={productDetails?.images?.mainImage} alt='' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                    </div>
                    <h1>{productDetails?.name}</h1>
                </div>
            </div>

        </div>
    )
}

export default ManagerProductDetails
