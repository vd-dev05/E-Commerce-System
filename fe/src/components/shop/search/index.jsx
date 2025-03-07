import axios from "axios"
import { useEffect, useState } from "react"

const SearchTop = () => {
    const [isLoading ,setIsLoading] = useState(true)
    const [data,setData] = useState([])
    useEffect(() => {
      const fetechData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/top-search`)
            setData(response.data.mappedResponse)
            setIsLoading(false)
            
        } catch (error) {
            console.log(error);
            
        }
      }
      fetechData()
    }, [])
    

    return (
        <div>
            <h2 className="text-xl font-normal">Top tìm kiếm hàng đầu </h2>
            <div className="grid grid-cols-6 gap-4 mt-4">
                {isLoading === false && data.slice(0, 6).map((item) => (
                    <div key={item.id} className="cursor-pointer w-[200px]">
                        <div className="relative w-full ">
                            <span className="bg-red-400 p-2 rounded-b-full absolute text-white -top-5 left-1">Top</span>
                            <img
                                className="w-full h-[200px] object-cover rounded-md"
                                src={item?.search?.img} alt="" />
                            <div className="absolute bottom-0  w-full bg-black bg-opacity-50 p-2  ">
                                <div className=" flex items-center justify-center text-white">{item?.count} lượt tìm kiếm</div>
                            </div>
                        </div>
                        <p className="mt-2 text-center">{item?.search?.name}</p>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default SearchTop;