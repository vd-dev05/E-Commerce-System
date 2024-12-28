import { assets } from '@/assets/assets'
import Address from '@/components/shop/address'
import ShoppingOrders from '@/components/shop/orders'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const ShoppingAccount = () => {


    return (
        <div className='flex flex-col'>
            <div className='relative h-[300px] w-full overflow-hidden'>
                <img src={assets.account} className='h-full w-full object-cover object-center' />
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                    <Tabs defaultValue='orders'>
                        <TabsList className='mb-4'>
                            <TabsTrigger value='orders'>
                                Orders
                            </TabsTrigger>
                            <TabsTrigger value='address'>
                                Address
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value='orders'>
                            <ShoppingOrders />
                        </TabsContent>
                        <TabsContent value='address'>
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>

            </div>

        </div>
    )
}

export default ShoppingAccount
