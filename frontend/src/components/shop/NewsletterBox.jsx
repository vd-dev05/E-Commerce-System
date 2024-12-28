import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div className='text-center my-8'>
            <p className='text-2xl font-medium'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, eum! Atque, optio!
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-xl'>
                <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none rounded-xl' required />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4 rounded-xl'>SUBSCRIBE</button>
            </form>

        </div>
    )
}

export default NewsletterBox
