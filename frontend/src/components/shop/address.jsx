import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, fetchAllAddresses, removeAddress, updateAddress } from '@/store/shop-slice/address-slice'
import { toast } from '@/hooks/use-toast'
import AddressCard from './address-card'
import { Button } from '../ui/button'



const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}

const Address = ({ setSelectedAddress, selectedAddress }) => {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [isEdit, setIsEdit] = useState(null)
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopAddress)

    const handleManageAddress = (e) => {
        if (isEdit !== null) {
            e.preventDefault();
            dispatch(updateAddress({
                userId: user?.id, addressId: isEdit, formData
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setIsEdit(null)
                    setFormData(initialAddressFormData)
                    toast({
                        title: data.payload.message
                    })
                }
            })
        } else {
            e.preventDefault();
            dispatch(addNewAddress({
                ...formData,
                userId: user?.id
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setFormData(initialAddressFormData)
                    toast({
                        title: data.payload.message
                    })
                }

            })
        }
    }

    const handleUpdateAddress = (getAddress) => {
        setIsEdit(getAddress?._id)
        setFormData({
            ...formData,
            address: getAddress?.address,
            city: getAddress?.city,
            phone: getAddress?.phone,
            pincode: getAddress?.pincode,
            notes: getAddress?.notes
        })
    }
    const handleDeleteAddress = (getAddressId) => {
        dispatch(removeAddress({
            userId: user?.id, addressId: getAddressId
        })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id))
                toast({
                    title: data?.payload?.message
                })
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])

    return (
        <Card>
            <div className='my-5 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-4'>
                {
                    addressList && addressList.length > 0 ?
                        addressList.map((address, index) => <AddressCard
                            handleDeleteAddress={handleDeleteAddress}
                            addressInfo={address}
                            handleUpdateAddress={handleUpdateAddress}
                            setSelectedAddress={setSelectedAddress}
                            selectedAddress={selectedAddress}
                            key={index}

                        />
                        ) : null
                }
            </div>
            <CardHeader>
                <CardTitle>{
                    isEdit !== null ? 'Update Address' : 'Add New Address'
                }</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                <CommonForm
                    formControls={addressFormControls}
                    setFormData={setFormData}
                    formData={formData}
                    buttonText={isEdit !== null ? 'Save' : 'Add'}
                    onSubmit={handleManageAddress}
                />
                {
                    isEdit ? <Button onClick={() => {
                        setIsEdit(null);
                        setFormData(initialAddressFormData)
                    }}
                        className='bg-white text-black border w-full hover:bg-black hover:text-white'>Canel</Button> : null
                }
            </CardContent>
        </Card>
    )
}

export default Address
