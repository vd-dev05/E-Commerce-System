import { Input } from "antd";
import { SearchIcon } from "lucide-react";

const AdminUser = () => {
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