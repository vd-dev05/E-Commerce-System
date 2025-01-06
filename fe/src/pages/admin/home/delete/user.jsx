import { getUser } from "@/store/admin";
import { Input } from "antd";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminUser = () => {
    const [data , setData] = useState([])
    const dispath = useDispatch()
    const dataUser = useSelector(state => state.adminAuth)
    useEffect(() => {
        const response  = dispath(getUser())
        console.log(response);
        console.log(dataUser );
        
    }, [dispath])
    

    return ( 
    <div className="h-full w-full px-5">
        <h1 className="text-2xl text-center">Danh sách người dùng</h1>
        <div className="py-5">
        <Input.Search
        placeholder="Tìm kiếm theo email hoặc phone"
        enterButton={<SearchIcon />}
        size="large"
        // onChange={handleSearchChange}
        // value={searchText}
      />
      
        </div>
       
    </div> 
    );
}
 
export default AdminUser;