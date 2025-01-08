import ListProduct from "@/components/shop/details/listing";
import ShoppingHeader from "@/components/shop/header";
import useCounter from "@/hooks/custom";
import { checkAuthUser, logoutUser } from "@/store/Shop/auth";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const ProductDetails = () => {
    const location = useLocation()
    const query = queryString.parse(location.search)
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

 
    
    useEffect(() => {
        dispatch(checkAuthUser())
    }, [dispatch])


    const handleLogout = () => {
        dispatch(logoutUser()).then(data => {
            if (data?.payload?.success) {
                navigate('/shop/login')
            }
        })
    }
    const [count, increment, decrement] = useCounter(localStorage.getItem('count') || 0);

    return (
        <div>
            <div className="pb-2">
                <ShoppingHeader count={count} user={user} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            </div>
            <hr />
            <div className="px-5">
            <ListProduct/>
            </div>
           
        </div>
    );
}

export default ProductDetails;