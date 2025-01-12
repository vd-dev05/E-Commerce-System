import FilterProduct from "./filter";
import ProductDetails from "./listProduct";

const ListProduct = () => {
    
    return ( 
        <div className="px-5 flex ">
            <div>
                <FilterProduct />
            </div>
            <div className="w-full py-5 px-6">
                <ProductDetails/>
            </div>
        </div>
     );
}
 
export default ListProduct;