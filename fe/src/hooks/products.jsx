
import { useState } from "react";
import { useDispatch } from "react-redux"

const ProductsCustom = ({ productType, variants, className, select, setSelect }) => {
  const dispatch = useDispatch()
  // const [variants, setVariants] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  // console.log(variants);

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

  const handleAttributeSelect = (attributeName, value) => {

    const ATTRIBUTE_ORDER = [];
    variants.forEach(variant => {
      variant.attributes.forEach(attribute => {
        if (!ATTRIBUTE_ORDER.includes(attribute.name)) {
          ATTRIBUTE_ORDER.push(attribute.name);
        }
      });
    });


    const newSelect = { ...select };
    if (newSelect[attributeName]?.value === value) {
      delete newSelect[attributeName];
    } else {
      newSelect[attributeName] = { value };
    }


    const sortedSelect = Object.entries(newSelect)
      .sort(([a], [b]) => {
        const indexA = ATTRIBUTE_ORDER.indexOf(a);
        const indexB = ATTRIBUTE_ORDER.indexOf(b);
        return indexA - indexB;
      })
      .reduce((acc, [key, val]) => {
        acc[key] = val;
        return acc;
      }, {});
    if (sortedSelect) {
      setSelect(sortedSelect);
    }


  };



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

