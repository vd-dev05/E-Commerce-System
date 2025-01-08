import FilterProduct from "./filter";

const ListProduct = () => {
    return ( 
        <div className="px-5 flex">
            <div>
                <FilterProduct />
            </div>
            <div>
                list product
            </div>
        </div>
     );
}
 
export default ListProduct;