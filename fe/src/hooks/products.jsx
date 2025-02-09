
import { useDispatch } from "react-redux"

const ProductsCustom = ({ productType, attributes, className , select, setSelect }) => {
    const dispatch = useDispatch()
  
    return (
        <div className="flex flex-col p-2 gap-10">
            {attributes?.map((item, index) => {
                return (
                    <div className="flex gap-20 items-center py-2" key={index}>
                        <p>{item.name}</p>
                        <div className="flex gap-6">
                            {item.values.map((i, index) => (
                                <button
                                    onClick={() => {
                                        const newSelect = { ...select };
                                        if (newSelect[item.name]?._id === i._id) {
                                            delete newSelect[item.name];  // Bỏ chọn khi đã chọn lại
                                        } else {
                                            newSelect[item.name] = i;  // Chọn giá trị mới
                                        }
                                        setSelect(newSelect);
                                    }}

                                    className={`border-[1px] p-2 rounded-sm text-xs 
                          ${select?.[item.name]?._id === i._id ? "bg-zinc-800 text-zinc-50" : ''}
                            ${i.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : ''}`}
                                    disabled={i.quantity === 0}
                                    key={index}>

                                    {i?.value}
                                </button>
                            ))}
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
export default ProductsCustom



// export const PhoneProductsCustom = ({ attributes, className, dispatch }) => {

//     return (
//         <div className={className}>
//             {attributes?.map((item, index) => {
//                 return (
//                     <div className="flex gap-20 items-center py-2" key={index}>
//                         <p>{item.name}</p>
//                         <div className="flex gap-6">
//                             {item.values.map((i, index) => (
//                                 <button
//                                     className="border-[1px] p-2 rounded-sm text-xs "
//                                     key={index}>
//                                     {i?.value}
//                                 </button>
//                             ))}
//                         </div>

//                     </div>
//                 )
//             })}
//             {/* <div className="flex gap-20 items-center">
//                 <p>Màu sắc</p>
//                 <div className="flex gap-6">
//                     {[...color].map((item, index) => (
//                         <button
//                             className="border-[1px] p-2 rounded-sm text-xs "
//                             key={index}>
//                             {item}
//                         </button>
//                     ))}
//                 </div>

//             </div> */}

//         </div>
//     )
// }

// export const FashionProductsCustom = ({ attributes, className, select, setSelect, dispatch }) => {
//     // console.log(attributes);
//     return (
//         <div className="flex flex-col p-2 gap-10">
//             {/* <div className="flex gap-20 items-center">
//                 <p>Kich cỡ</p>
//                 <div className="flex gap-6">
//                     {[...size].map((item, index) => (
//                         <button
//                             className="border-[1px] p-2 rounded-sm text-xs "
//                             key={index}>
//                             {item}
//                         </button>
//                     ))}
//                 </div>

//             </div>

//             <div className="flex gap-20 items-center">
//                 <p>Nhóm màu</p>
//                 <div className="flex gap-6">
//                     {[...color].map((item, index) => (
//                         <button
//                             className="border-[1px] p-2 rounded-sm text-xs "
//                             key={index}>
//                             {item}
//                         </button>
//                     ))}
//                 </div>

//             </div> */}
//             {attributes?.map((item, index) => {

//                 return (
//                     <div className="flex gap-20 items-center py-2" key={index}>
//                         <p>{item.name}</p>
//                         <div className="flex gap-6">
//                             {item.values.map((i, index) => (
//                                 <button
//                                     onClick={() => {
//                                         const newSelect = { ...select };
//                                         if (newSelect?.[item._id]?._id === i._id) {
//                                             delete newSelect[item._id];  // Bỏ chọn khi đã chọn lại
//                                         } else {
//                                             newSelect[item._id] = i;  // Chọn giá trị mới
//                                         }
//                                         setSelect(newSelect);
//                                         console.log(newSelect);
                                      
//                                     }}
//                                     className={`border-[1px] p-2 rounded-sm text-xs 
//                           ${select?.[item._id]?._id === i._id ? "bg-zinc-800 text-zinc-50" : ''}
//                             ${i.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : ''}`}
//                                     disabled={i.quantity === 0}
//                                     key={index}>

//                                     {i?.value}
//                                 </button>
//                             ))}
//                         </div>

//                     </div>
//                 )
//             })}
//         </div>
//     )

// }
