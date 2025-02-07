
const ProductsCustom = ({ productType, attributes, className }) => {

    switch (productType) {
        case "Điện Thoại":
            return <PhoneProductsCustom className={className} color={attributes.color} />
        case 'Thời Trang Nam':
            return <FashionProductsCustom color={attributes.color} size={attributes.size} />
    }
}
export default ProductsCustom



export const PhoneProductsCustom = ({ color, className }) => {
    console.log(color);

    return (
        <div className={className}>
            <div className="flex gap-20 items-center">
                <p>Màu sắc</p>
                <div className="flex gap-6">
                    {[...color].map((item, index) => (
                        <button
                            className="border-[1px] p-2 rounded-sm text-xs "
                            key={index}>
                            {item}
                        </button>
                    ))}
                </div>

            </div>

        </div>
    )
}

export const FashionProductsCustom = ({ color, size, className }) => {
    // console.log(color, size);
    return (
        <div className="flex flex-col p-2 gap-10">
            <div className="flex gap-20 items-center">
                <p>Kich cỡ</p>
                <div className="flex gap-6">
                    {[...size].map((item, index) => (
                        <button
                            className="border-[1px] p-2 rounded-sm text-xs "
                            key={index}>
                            {item}
                        </button>
                    ))}
                </div>

            </div>

            <div className="flex gap-20 items-center">
                <p>Nhóm màu</p>
                <div className="flex gap-6">
                    {[...color].map((item, index) => (
                        <button
                            className="border-[1px] p-2 rounded-sm text-xs "
                            key={index}>
                            {item}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )

}
