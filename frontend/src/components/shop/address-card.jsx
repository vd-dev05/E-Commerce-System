import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({ addressInfo, handleDeleteAddress, handleUpdateAddress, setSelectedAddress, selectedAddress }) => {

    const isSelected = selectedAddress?._id === addressInfo?._id;
    return (
        <Card onClick={setSelectedAddress ? () => setSelectedAddress(addressInfo) : null} className={`cursor-pointer ${isSelected ? 'border-gray-950 border-2' : 'border-gray-200'}`}>
            <CardContent className='grid gap-4 p-4'>
                <Label><span className='font-bold mr-2'>Address:</span>{addressInfo?.address}</Label>
                <Label><span className='font-bold mr-2'>City:</span>{addressInfo?.city}</Label>
                <Label><span className='font-bold mr-2'>Pincode:</span>{addressInfo?.pincode}</Label>
                <Label><span className='font-bold mr-2'>Phone:</span>{addressInfo?.phone}</Label>
                <Label><span className='font-bold mr-2'>Notes:</span>{addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className='flex items-center justify-between mt-4'>
                <Button onClick={() => handleUpdateAddress(addressInfo)}>Edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo?._id)}>Remove</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard
