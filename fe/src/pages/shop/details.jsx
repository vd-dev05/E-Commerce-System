import ListProduct from "@/components/shop/details/listing";
import ShoppingHeader from "@/components/shop/header";
import { allcategory } from "@/config";
import useCounter from "@/hooks/custom";
import { mapCategoryFromUrl } from "@/lib/utils";
import { checkAuthUser, logoutUser } from "@/store/Shop/auth";
import { getRouteData } from "@/store/Shop/users/userThunk";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const ProductDetails = () => {
    const location = useLocation()
    const query = queryString.parse(location.search)
    const path  = location.pathname.split('/shop/listing/')[1]
    // const path = queryString.parseUrl(location.pathname)
    // console.log(query);
    // console.log(location.pathname.split('/shop/listing/')[1]);
    
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const mapalpha = mapCategoryFromUrl(decodeURI(path))
    const dataCategoryLink = allcategory[mapalpha]
    
    useEffect(() => {
      if (!dataCategoryLink || dataCategoryLink === undefined || dataCategoryLink === null) {
        navigate(`/shop/home`)
      }
    }, [dataCategoryLink])
    
    
    
    useEffect(() => {
        dispatch(checkAuthUser())
        dispatch(getRouteData(dataCategoryLink[decodeURI(path)]))
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
            <ListProduct data={dataCategoryLink[decodeURI(path)]}/>
            </div>
           
        </div>
    );
}

export default ProductDetails;