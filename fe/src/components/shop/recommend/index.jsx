const Recommend = () => {
    return (
        <div>
            <h2 className="text-xl font-normal">Gợi ý cho bạn</h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="cursor-pointer w-[200px]">
                    <div className="relative w-full ">
                        <img
                            className="w-full h-[200px] object-cover rounded-md"
                            src="https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_400x400q80.jpg_.avif" alt="" />
                    </div>
                   <div>
                        <h3>Ao khoac</h3>
                        <span>100k</span>
                        <sub>- 30% </sub>
                   </div>

                </div>
            </div>
        </div>
    );
}

export default Recommend;