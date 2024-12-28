import { assets } from '@/assets/assets'
import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AuthRegister = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''

    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: 'Success',
                    description: data?.payload?.message
                })
                navigate('/auth/login')
            } else {
                toast({
                    title: data.payload.message,
                    variant: 'destructive'
                })
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <div className='flex flex-col items-center'>
                    <Link to='/shop/home' >
                        <img src={assets.logo} alt="" className='w-60' />
                    </Link>
                    <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>

                </div>

            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            <div className='text-center'>
                <p className='mt-2'>Already have an account
                    <Link className='font-medium text-primary hover:underline ml-2' to='/auth/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthRegister
