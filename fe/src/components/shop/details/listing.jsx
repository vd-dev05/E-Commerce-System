import { useState } from "react";
import FilterProduct from "./filter";
import ProductDetails from "./listProduct";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { locationQuery } from "@/lib/utils";
import queryString from "query-string";

const ListProduct = () => {
    const {payloadProducts ,isProducts , isGetQueryCategoryProduct} = useSelector(state => state.shoppingProduct)
    const query = queryString.parse(locationQuery())
    const location = useLocation()
    const checkQuery = Object.keys(query).length > 0 
    return ( 
        <div className="px-5 flex ">
            <div>
                <FilterProduct
                checkQuery={checkQuery}
                location={location} 
                query = {query}
                payloadProducts={payloadProducts}
                isProducts={isProducts}
                isGetQueryCategoryProduct={isGetQueryCategoryProduct}
                />
            </div>
            <div className="w-full py-5 px-6">
                <ProductDetails 
                checkQuery={checkQuery}
                location={location} 
                payloadProducts={payloadProducts} 
                isProducts={isProducts}
                 isGetQueryCategoryProduct={isGetQueryCategoryProduct} />
            </div>
        </div>
     );
}
 
export default ListProduct;