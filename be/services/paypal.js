import axios from "axios"
import qs from "qs"
import { ErrorNotFoundResponse, ErrorResponse } from "../error/errorResponse.js";
import { CoinError, UnauthorizedError } from "../error/user/userError.js";
import UserModel from "../models/auth/userModel.js"
import Transition from "../models/shop/transitionModels.js";
const PayPalServices = {

    getPayPalToken: async () => {
        const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
        const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

        const url = process.env.PAYPAL_BASE_URL + "/v1/oauth2/token";

        const data = qs.stringify({
            grant_type: "client_credentials"
        });
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`
                },
            })

            return response.data.access_token
        } catch (error) {
            console.log(error)
        }


    },
    createOrder: async (req, res) => {
        try {
            const accessToken = await PayPalServices.getPayPalToken();
            // const data = req.body 
            const data1 = {
                intent: "CAPTURE",
                payment_source: {
                    paypal: {
                        experience_context: {
                            // payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                            // landing_page: "LOGIN",
                            // shipping_preference: "GET_FROM_FILE",
                            user_action: "PAY_NOW",
                            return_url: "https://localhost:5000/api/v1/paypal/complete-order",
                            cancel_url: "https://localhost:5000/api/v1/paypal/cancel-order",
                            bran_name: "E-Com.io"
                        }
                    }
                },
                purchase_units: [
                    {
                        invoice_id: "90210",
                        amount: {
                            currency_code: "USD",
                            value: "230.00",
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: "220.00"
                                },
                                shipping: {
                                    currency_code: "USD",
                                    value: "10.00"
                                }
                            }
                        },
                        items: [
                            {
                                name: "T-Shirt",
                                description: "Super Fresh Shirt",
                                unit_amount: {
                                    currency_code: "USD",
                                    value: "20.00"
                                },
                                quantity: "1",
                                category: "PHYSICAL_GOODS",
                                sku: "sku01",
                                image_url: "https://example.com/static/images/items/1/tshirt_green.jpg",
                                url: "https://example.com/url-to-the-item-being-purchased-1",
                                upc: {
                                    type: "UPC-A",
                                    code: "123456789012"
                                }
                            },
                            {
                                name: "Shoes",
                                description: "Running, Size 10.5",
                                sku: "sku02",
                                unit_amount: {
                                    currency_code: "USD",
                                    value: "100.00"
                                },
                                quantity: "2",
                                category: "PHYSICAL_GOODS",
                                image_url: "https://example.com/static/images/items/1/shoes_running.jpg",
                                url: "https://example.com/url-to-the-item-being-purchased-2",
                                upc: {
                                    type: "UPC-A",
                                    code: "987654321012"
                                }
                            }
                        ]
                    }
                ]
            }
            // const data = JSON.stringify(data1)

            //     intent: "CAPTURE",
            //     purchase_units: [
            //         {   
            //             items :[
            //                 {
            //                     name : "E-com order",
            //                     description : "an order demo",
            //                     quantity : 1,
            //                     unit_amount : {
            //                         currency_code : "USD",
            //                         value : "10.00"
            //                     }
            //                 }
            //             ],
            //             amount: {
            //                 currency_code: "USD",
            //                 value: "10.00",
            //                 breakdown: {
            //                     item_total: {
            //                         currency_code: "USD",
            //                         value: "10.00"
            //                     }
            //                 }
            //             }
            //         }
            //     ],
            //     application_context: {
            //         shipping_preference: "NO_SHIPPING",
            //         return_url: process.env.PAYPAL_RETURN_URL + '/api/v1/paypal/success-order',
            //         cancel_url: process.env.PAYPAL_CANCEL_URL + '/api/v1/paypal/cancel-order'
            //     }
            // })
            const url = process.env.PAYPAL_BASE_URL + "/v2/checkout/orders";
            if (!accessToken) {
                UnauthorizedError("Invalid token")
            } else {
                // console.log(url);

                const response = await axios.post(url, data1, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                res.json(response.data)
                // console.log(response);
            }


            // res.json(response.data)
        } catch (error) {
            console.log(error);

            ErrorResponse(res, error,)

        }
    },
    completeOrder: async (req, res) => {
        res.send("complete order")
    },
    createCoin: async (req, res) => {
        try {
            console.log(req.body);

            const accessToken = await PayPalServices.getPayPalToken();

            const data = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "100.00"
                        },
                        user_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b"
                    }
                ],
                payment_source: {
                    paypal: {
                        experience_context: {
                            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                            payment_method_selected: "PAYPAL",
                            locale: "en-US",
                            landing_page: "LOGIN",
                            user_action: "PAY_NOW",
                            return_url: "https://example.com/returnUrl",
                            cancel_url: "https://example.com/cancelUrl"
                        }
                    }
                }
            }

            const response = await axios.post(process.env.PAYPAL_BASE_URL + "/v2/checkout/orders", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })
            res.json(response.data)

        } catch (error) {
            ErrorResponse(res, error, 500)
        }

    },
    createCoinUser: async (req, res) => {
        try {
            // const amount: '28.00', date: '2025-01-23T08:22:02Z', status: 'COMPLETED'
            const { amount, date, status, orderId } = req.body

            if (!amount && !date && status) {
                CoinError('Not Pay ment succsess')
            }
            if (status === 'COMPLETED') {
                const bill = await Transition.create({
                    userId: req.user.id,
                    date: new Date(),
                    coin: amount,
                    type: 'paypal',
                    status: true,
                    transactionType: 'add'
                })
           
                const updateCoin = await UserModel.findByIdAndUpdate(req.user.id, {
                    $inc: { coin: amount },
                    $push: { coinTransaction: bill._id }
                }, { new: true })

                if (bill) {
                return   res.status(201).json({
                        success: true,
                        message: "Create coin user successfully",
                        data: {
                            user: {
                                name: updateCoin.name,
                                coin: updateCoin.coin
                            },
                            amount,
                            date,
                            status
                        }
                    })
                }

            }

        } catch (error) {
            ErrorNotFoundResponse(res, error, 404)
        }
    },
    getCoinUser: async (req, res) => {
        try {

            const user = await UserModel.findById(req.user.id).select('coin')

            res.json({
                success: true,
                message: "Get coin user successfully",
                coin: user.coin
            })
        } catch (error) {
            ErrorNotFoundResponse(res, error, 404)
        }
    }
}
export default PayPalServices