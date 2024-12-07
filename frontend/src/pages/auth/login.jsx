import { assets } from '@/assets/assets'
import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const AuthLogin = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: ''

    })
    const dispatch = useDispatch();
    const { toast } = useToast()

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='flex flex-col items-center'>
                <Link to='/shop/home' >
                    <img src={assets.logo} alt="" className='w-60' />
                </Link>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In</h1>

            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            <div className='text-center'>
                <p className='mt-2'>Don't have an account ?
                    <Link className='font-medium text-primary hover:underline ml-2' to='/auth/register'>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthLogin
