import React from 'react'

const ManagerHeader = ({ title }) => {
    return (
        <div className='px-32 py-8 flex items-center gap-4 shadow-slate-200 shadow-md'>
            <h1 className='text-2xl font-bold'>E-Commecre</h1>
            <div className='flex flex-1 items-center justify-between'>
                <h2 className='text-2xl font-normal'>{title}</h2>
                <p className='text-lg text-red-500 cursor-pointer'>Bạn cần giúp đỡ gì ?</p>
            </div>
        </div>
    )
}

export default ManagerHeader
