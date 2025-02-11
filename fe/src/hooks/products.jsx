
import { useState } from "react";
import { useDispatch } from "react-redux"

const ProductsCustom = ({ productType, variants, className , select, setSelect }) => {
    const dispatch = useDispatch()
    // const [variants, setVariants] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const allAttributeNames = [
        ...new Set(
          variants.flatMap(variant => 
            variant.attributes.map(attribute => attribute.name)
          )
        )
      ];
      const attributeValues = allAttributeNames.map(attributeName => ({
        name: attributeName,
        values: [
          ...new Set(
            variants.flatMap(variant => 
              variant.attributes
                .filter(attribute => attribute.name === attributeName)
                .map(attribute => attribute.value)
            )
          )
        ]
      }));
  
      
      

        // Hàm xử lý khi chọn thuộc tính
  const handleAttributeSelect = (attributeName, value) => {

  const newSelect = { ...select };
  if (newSelect[attributeName]?.value === value) {
    delete newSelect[attributeName];  // Bỏ chọn khi đã chọn lại
  } else {
    newSelect[attributeName] = {value};  // Chọn giá trị mới
  }
  setSelect(newSelect);

};


  // Lọc các variants theo các lựa chọn
//   const filteredVariants = variants.filter(variant =>
//     Object.keys(selectedAttributes).every(attributeName =>
//       variant.attributes.some(attribute =>
//         attribute.name === attributeName && attribute.value === selectedAttributes[attributeName]
//       )
//     )
//   );


    
    return (
        <div className="flex flex-col p-2 gap-10">
             {attributeValues.map((attribute, index) => (
        <div key={index} className="flex gap-20">
          <h3>{attribute.name}</h3>
          <div className="flex gap-2">
            {attribute.values.map((value, i) => (
              <button
         
              className={`border-[1px] p-2 rounded-sm text-xs 
                ${select?.[attribute.name]?.value === value ? "bg-zinc-800 text-zinc-50" : ''}
                ${variants.some(variant => 
                    variant.attributes.some(attr => 
                        attr.name === attribute.name && attr.value === value && attr.quantity === 0
                    )) ? "bg-gray-400 cursor-not-allowed" : ''}`}
            key={i}
            onClick={() => handleAttributeSelect(attribute.name, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

        </div>
    )
}
export default ProductsCustom

{
    // {i?.variants.map((item,index) => {
    //     // console.log(item);
        
    //     return (
    //         <div className="flex gap-20 items-center py-2" key={index}>
    //             <p>{item?.name}</p>
    //             <div className="flex gap-6">
    //                 {/* {item.values.map((i, index) => (
    //                     <button
    //                         onClick={() => {
    //                             const newSelect = { ...select };
    //                             if (newSelect[item.name]?._id === i._id) {
    //                                 delete newSelect[item.name];  // Bỏ chọn khi đã chọn lại
    //                             } else {
    //                                 newSelect[item.name] = i;  // Chọn giá trị mới
    //                             }
    //                             setSelect(newSelect);
    //                         }}

    //                         className={`border-[1px] p-2 rounded-sm text-xs 
    //               ${select?.[item.name]?._id === i._id ? "bg-zinc-800 text-zinc-50" : ''}
    //                 ${i.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : ''}`}
    //                         disabled={i.quantity === 0}
    //                         key={index}>

    //                         {i?.value}
    //                     </button>
    //                 ))} */}
    //             </div>

    //         </div>
    //     )
    // })}
   
}

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
