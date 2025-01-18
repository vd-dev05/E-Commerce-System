const SearchTop = () => {
    let dataSeach = [
    ]
    for (let i = 0; i < 12; i++) {
        dataSeach.push({
            id: i + 1,
            label: `ao thun ${Math.floor(Math.random() * 100) + 1}`,
            qery: `ao-thun-${Math.floor(Math.random() * 100) + 1}`,
            quantity: 10,
            quantity_buy: 1000,
            image: 'https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_400x400q80.jpg_.avif'
        })
    }

    return (
        <div>
            <h2 className="text-xl font-normal">Top tìm kiếm hàng đầu </h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {[...Array(4)].map((_, index) => (
                    <div className="cursor-pointer w-[200px]">
                        <div className="relative w-full ">
                            <span className="bg-red-400 p-2 rounded-b-full absolute text-white -top-5 left-1">Top</span>
                            <img
                                className="w-full h-[200px] object-cover rounded-md"
                                src="https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_400x400q80.jpg_.avif" alt="" />
                            <div className="absolute bottom-0  w-full bg-black bg-opacity-50 p-2  ">
                                <div className=" flex items-center justify-center text-white">Da ban 4k</div>
                            </div>
                        </div>
                        <p className="mt-2 text-center">Ao thun Nam</p>

                    </div>
                ))}


                {/* {dataSeach.map((item) => (
                     <div key={item.id} className="bg-gray-100 p-4 rounded-md">
                         <h3 className="text-lg font-semibold">{item.label}</h3>
                         <p className="text-gray-600">{item.qery}</p>
                     </div>
                 ))} */}
            </div>
        </div>
    );
}

export default SearchTop;