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
                 {dataSeach.map((item) => (
                     <div key={item.id} className="bg-gray-100 p-4 rounded-md">
                         <h3 className="text-lg font-semibold">{item.label}</h3>
                         <p className="text-gray-600">{item.qery}</p>
                     </div>
                 ))}
             </div>
       </div>
     );
}
 
export default SearchTop;