const Recommend = () => {
    return ( 
        <div>
            <h2 className="text-xl font-normal">Gợi ý cho bạn</h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg font-semibold">Product 1</h3>
                    <p className="text-gray-600">Description of Product 1</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg font-semibold">Product 2</h3>
                    <p className="text-gray-600">Description of Product 2</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg font-semibold">Product 3</h3>
                    <p className="text-gray-600">Description of Product 3</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg font-semibold">Product 4</h3>
                    <p className="text-gray-600">Description of Product 4</p>
                </div>
            </div>
        </div>
     );
}
 
export default Recommend;