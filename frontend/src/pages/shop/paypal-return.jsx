import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop-slice/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

const PaypalReturnPage = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const parmas = new URLSearchParams(location.search)
    const paymentId = parmas.get('token')
    const payerId = parmas.get('PayerID')

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('OrderId'))

            dispatch(capturePayment({ paymentId, payerId, orderId })).then(data => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem('OrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        } else {
            const orderId = JSON.parse(sessionStorage.getItem('OrderId'))
            dispatch(capturePayment({ orderId })).then(data => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem('OrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        }
    }, [payerId, paymentId, dispatch])


    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing Payment...Please wait!</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalReturnPage
