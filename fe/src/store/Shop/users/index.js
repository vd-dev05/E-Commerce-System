import { createSlice } from "@reduxjs/toolkit";
import {
    getRouteData, uploadAvatar, addToCartProduct, createOrder, createAddress,
    createSearch, editAddress, editProfile, getAlladdress, getCoinPaypal,
    getCoinTransaction, getSearch,getToCartProduct,getVoucher,orderCoinPayPal,
    getProductById,postQueryProduct,removeAllCart,removeToCartProduct,
    getOrderProductId,
    editPaymentOrder,
    getOrderPaymentProcess,
    recommendProduct,
    getQueryCategoryProduct


} from "./userThunk";

const shoppingProduct = createSlice({
    name: 'shoppingProduct',
    initialState: {
        isLoading: true,
        routeData: null,
        avatar: null,
        isSuccessCoin: false,
        coinUpdate: null,
        isSuccesEdit: false,
        coinTransaction: null,
        isTransaction: false,
        isAddress: false,
        isUpdateAddress: false,
        addressMessageUpdate: null,
        addressMessage: null,
        addressPaydata: null,
        isSearch: false,
        payloadSearch: null,
        isActiveVoucher: false,
        payloadVoucher: null,
        isProducts: false,
        payloadProducts: null,
        cartIndex: 0,
        attributes: [],
        items: [],
        isAddToCart: false,

        isGetToCartProduct: false,
        payloadCartProduct: null,
        totalCart: 0,

        isRemoveCartProduct: false,
        isRemoveAllProduct: false,
      
        isOrder: false,
        isPaymentOrder: false,
        isOrderMessage: null,
        messageOrder: null,
        payloadOrder : null,

        isLoadingOrderProduct : false,
        payloadOrderProduct : null,

        isPaymentSuccess : false,
        payloadPaymentSuccess : null,

        isPaymentProcess : false,
        payloadPaymentProcess : null,
        payloadTotalPaymentProcess : 0,

        isLoadingRecommend : false,
        payloadRecommend : null,

        isGetQueryCategoryProduct : false,
        payloadQueryCategoryProduct : null
    },
    reducers: {
        setProduct: (state, action) => { },
        addToCart: (state, action) => {
            // state.items.push(action.payload);
            state.cartIndex += 1
            // state.totalPrice += action.payload.price;
            // state.isCartEmpty = false;
            // Lưu trữ state vào localStorage
            // localStorage.setItem('cart', JSON.stringify(state));
        },
        removeToCart: (state, action) => {
            if (state.cartIndex === 0) {
                return
            } else {
                state.cartIndex -= 1;
            }

        },
        selectAttributes: (state, action) => {
            console.log(state, action);

        },
        onpopstate: (state, action) => {
            state.isOrder = false,
                state.messageOrder = null,
                state.isPaymentOrder = false,
                state.isOrderMessage = null
        },
        clickRecommend : (state ,action ) => {
            let arrRecommend = localStorage.getItem('recommend')

            if (!arrRecommend) {
                arrRecommend = [];
                localStorage.setItem('recommend', JSON.stringify(arrRecommend));
            } else {
                arrRecommend = JSON.parse(arrRecommend);
          
                const sortedArr = arrRecommend.sort((a, b) => b.date - a.date);
                const checkDuplicate = sortedArr.find(item => item.id === action.payload.id);
                if (checkDuplicate) {
                    const index = sortedArr.indexOf(checkDuplicate);
                    sortedArr.splice(index, 1);
                    localStorage.setItem('recommend', JSON.stringify(sortedArr));
                }

            }

            if (arrRecommend) {
                // console.log(action);
                const data =  {
                    ...action.payload,
                    date : new Date().getTime()
                }
                arrRecommend.push(data);
                localStorage.setItem('recommend', JSON.stringify(arrRecommend));
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRouteData.pending, (state) => { state.isLoading = true })
            .addCase(getRouteData.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.routeData = action.payload

            })
            .addCase(getRouteData.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(uploadAvatar.pending, (state) => { state.isLoading = true })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false
                state.avatar = action.payload
            })
            .addCase(uploadAvatar.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(orderCoinPayPal.pending, (state) => { state.isLoading = true, state.isSuccessCoin = false })
            .addCase(orderCoinPayPal.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload?.success === true) {
                    state.isSuccessCoin = true
                    state.coinUpdate = action.payload.data.user.coin

                }

            })
            .addCase(orderCoinPayPal.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(getCoinPaypal.pending, (state) => { state.isLoading = true, state.isSuccessCoin = false })
            .addCase(getCoinPaypal.fulfilled, (state, action) => {
                state.isLoading = false
                state.coinUpdate = action.payload.coin
            })
            .addCase(getCoinPaypal.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(editProfile.pending, (state) => { state.isSuccesEdit = false })
            .addCase(editProfile.fulfilled, (state, action) => {
                if (action.payload?.success === true) {
                    state.isSuccesEdit = true
                }
            })
            .addCase(editProfile.rejected, (state) => { state.isSuccesEdit = false })
        builder
            .addCase(getCoinTransaction.pending, (state) => { state.isLoading = false, state.isTransaction = false })
            .addCase(getCoinTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.coinTransaction = action.payload
                state.isTransaction = true
            })
            .addCase(getCoinTransaction.rejected, (state) => { state.isLoading = false, state.isTransaction = false })
        builder
            .addCase(createAddress.pending, (state) => { state.isAddress = false, state.addressMessage = null })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.isAddress = true
            })
            .addCase(createAddress.rejected, (state) => { state.isAddress = false, state.addressMessage = null })
        builder
            .addCase(getAlladdress.pending, (state) => { state.isAddress = false, state.addressMessage = null, state.addressPaydata = null })
            .addCase(getAlladdress.fulfilled, (state, action) => {
                state.isAddress = true;
                state.addressPaydata = action.payload.address
                state.addressMessage = action.payload.message
            })
            .addCase(getAlladdress.rejected, (state, action) => {
                state.isAddress = false;
                state.addressMessage = action.payload || "An error occurred.";
            })
        builder
            .addCase(editAddress.pending, (state) => { state.isUpdateAddress = false, state.addressMessageUpdate = null })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isUpdateAddress = true,
                state.isAddress = false
                state.addressPaydata = null
                state.addressMessageUpdate = action.payload.message
            })
            .addCase(editAddress.rejected, (state) => { state.isUpdateAddress = false, state.addressMessageUpdate = action.payload || "An error occurred." })
        builder
            .addCase(createSearch.pending, (state) => { state.isSearch = false })
            .addCase(createSearch.fulfilled, (state, action) => {
                state.isSearch = true
            })
            .addCase(createSearch.rejected, (state) => { state.isSearch = false })
        builder
            .addCase(getSearch.pending, (state) => { state.isSearch = false })
            .addCase(getSearch.fulfilled, (state, action) => {
                state.isSearch = true
                state.payloadSearch = action?.payload?.search
            })
            .addCase(getSearch.rejected, (state) => { state.isSearch = false })
        builder
            .addCase(postQueryProduct.pending, (state) => { state.isProducts = false, state.payloadProducts = null })
            .addCase(postQueryProduct.fulfilled, (state, action) => {
                state.isProducts = true
                state.payloadProducts = action?.payload?.products
                // console.log(action.payload);

            })
            .addCase(postQueryProduct.rejected, (state) => { state.isProducts = false, state.payloadProducts = null })
        builder
            .addCase(getProductById.pending, (state) => { state.isProducts = false, state.payloadProducts = null })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isProducts = true
                state.payloadProducts = action?.payload?.product

            })
            .addCase(getProductById.rejected, (state) => { state.isProducts = false, state.payloadProducts = null })
        builder
            .addCase(addToCartProduct.pending, (state) => { state.isAddToCart = false })
            .addCase(addToCartProduct.fulfilled, (state, action) => {
                state.isAddToCart = true
            })
            .addCase(addToCartProduct.rejected, (state) => { state.isAddToCart = false })
        builder
            .addCase(getToCartProduct.pending, (state) => { state.isGetToCartProduct = true, state.items = [], state.totalCart = 0 })
            .addCase(getToCartProduct.fulfilled, (state, action) => {
                state.isGetToCartProduct = false
                state.payloadCartProduct = action?.payload?.cart
                state.totalCart = action?.payload?.total

            })
            .addCase(getToCartProduct.rejected, (state) => { state.isGetToCartProduct = false, state.items = [], state.totalCart = 0 })

        builder
            .addCase(removeToCartProduct.pending, (state) => { state.isRemoveCartProduct = true })
            .addCase(removeToCartProduct.fulfilled, (state, action) => {
                state.isRemoveCartProduct = false
                state.payloadCartProduct = null
                // state.payloadCartProduct = action?.payload?.cart
                // state.totalCart = action?.payload?.total 

            })
            .addCase(removeToCartProduct.rejected, (state) => { state.isRemoveCartProduct = false })
        builder
            .addCase(removeAllCart.pending, (state) => { state.isRemoveAllProduct = true })
            .addCase(removeAllCart.fulfilled, (state, action) => {
                state.isRemoveAllProduct = false
                state.payloadCartProduct = null
                state.totalCart = 0
            })
            .addCase(removeAllCart.rejected, (state) => { state.isRemoveAllProduct = false })

        builder
            .addCase(createOrder.pending, (state) => { state.isOrder = false, state.isLoading === true, state.payloadOrder = null, state.messageOrder = null })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading === false
                if (action?.payload?.success === false) {
                    state.isOrder = true
                    state.payloadOrder = action?.payload?.order
                    state.messageOrder = action?.payload?.message
                    // console.log(action?.payload);

                }

            })
            .addCase(createOrder.rejected, (state) => { state.isOrder = false, state.isLoading === true, state.payloadOrder = null, state.messageOrder = null })

        builder
            .addCase(getOrderProductId.pending, (state) => { state.isLoadingOrderProduct = true })
            .addCase(getOrderProductId.fulfilled, (state, action) => {
                state.isLoadingOrderProduct = false
                state.payloadOrderProduct = action?.payload    
            })
            .addCase(getOrderProductId.rejected, (state,action) => { console.log(action);
              })
        // builder 
        //     .addCase(createPaymentOrder.pending, (state) => { state.isPaymentOrder = true })
        //     .addCase(createPaymentOrder.fulfilled, (state, action) => {
        //         state.isPaymentOrder = false
        //         state.payloadPaymentOrder = action?.payload?.payment
        //     })
        //     .addCase(createPaymentOrder.rejected, (state) => { state.isPaymentOrder = false })
        builder
            .addCase(editPaymentOrder.pending, (state) => { state.isPaymentOrder = true , state.isPaymentSuccess = false,  state.payloadPaymentSuccess = null })
            .addCase(editPaymentOrder.fulfilled, (state, action) => {
                state.isPaymentOrder = false
                state.isPaymentSuccess = action?.payload?.success
                state.payloadPaymentSuccess = action?.payload?.message
       
            })
            .addCase(editPaymentOrder.rejected, (state) => { state.isPaymentOrder = false ,state.isPaymentSuccess = false,  state.payloadPaymentSuccess = null })
        builder
            .addCase(getOrderPaymentProcess.pending, (state) => { state.isPaymentProcess = true, state.payloadPaymentProcess = null })
            .addCase(getOrderPaymentProcess.fulfilled, (state, action) => {
                state.isPaymentProcess = false
                state.payloadPaymentProcess = action?.payload?.payment
                state.payloadTotalPaymentProcess = action?.payload?.total
    
            })
            .addCase(getOrderPaymentProcess.rejected, (state) => { state.isPaymentProcess = false, state.payloadPaymentProcess = null })
        builder
            .addCase(recommendProduct.pending, (state) => { state.isLoadingRecommend = true })
            .addCase(recommendProduct.fulfilled, (state, action) => {
                state.isLoadingRecommend = false
                state.payloadRecommend = action?.payload
            })
            .addCase(recommendProduct.rejected, (state) => { state.isLoadingRecommend = false, state.payloadRecommend = null })
        builder
            .addCase(getQueryCategoryProduct.pending, (state) => { state.isGetQueryCategoryProduct = true , state.payloadQueryCategoryProduct = null,state.payloadProducts = null })
            .addCase(getQueryCategoryProduct.fulfilled, (state, action) => {
                state.isGetQueryCategoryProduct = false
                state.payloadQueryCategoryProduct = action?.payload
                state.payloadProducts = action?.payload?.products
            })
            .addCase(getQueryCategoryProduct.rejected, (state) => { state.isGetQueryCategoryProduct = false, state.payloadQueryCategoryProduct = null })
    }

})

export const { setProduct, addToCart, removeToCart, selectAttributes, onpopstate,  clickRecommend } = shoppingProduct.actions
export default shoppingProduct.reducer
