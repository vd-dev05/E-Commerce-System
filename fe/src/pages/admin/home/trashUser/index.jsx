import { getUser } from "@/store/admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TrashUser = () => {
    const dispatch  = useDispatch()
    const {isLoading,dataUser} = useSelector(state => state.adminAuth)

    useEffect(() => {
      if (isLoading === false) {
        dispatch(getUser({page:1,limit:10}))
      }
    }, [])
    // console.log(dataUser);
    
    
    return (  
        <div className="bg-white p-2 m-2">
           <div>
            <h2 className="text-2xl font-bold">Trang xóa người dùng</h2>
            <div>

            </div>
           </div>
        </div>
    );
}
 
export default TrashUser;