import { editBlockUser, getBlockUser } from "@/store/admin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlockUser = () => {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [blockUser, setBlockUser] = useState([]);
    const { isBlockUser, payloadBlockUser , isEditBlockUser } = useSelector(state => state.adminAuth)
    const dispatch = useDispatch()
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        dispatch(getBlockUser());
    }, [isEditBlockUser])
    // console.log(isBlockUser,payloadBlockUser);
    
    return ( 
        <div className="px-4">
            <h1>block user</h1>
            <div className="mt-4">
                <h2>User block</h2>
                <input 
                    type="text" 
                    placeholder="Search user" 
                    className="p-2 border-2 border-black w-full"
                    onChange={handleSearch}
                />
                <div className="flex flex-col mt-4">
                    {/* {selectedUser && (
                        <div className="flex flex-row items-center p-2 border-2 border-black">
                            <img src={selectedUser.avatar} className="w-10 h-10 rounded-full" />
                            <div className="ml-2">
                                <h3>{selectedUser.name}</h3>
                                <p>{selectedUser.email}</p>
                            </div>
                            <button className="ml-auto p-2 bg-red-500 text-white rounded">
                                Block
                            </button>
                        </div>
                    )} */}
                     {
                        isBlockUser === true && payloadBlockUser?.map((user) => (
                            <div key={user._id} className="flex flex-row items-center p-2 border-2 border-black my-2">
                                <img src={user.avartar} className="w-10 h-10 rounded-full" />
                                <div className="ml-2">
                                    <h3>{user.username}</h3>
                                    <div className="flex gap-10">
                                    <p>{user?.email}</p>
                                    <p>Vi phạm chính sách : {user?.countBlock} lần</p>
                                    </div>
                                 

                                </div>
                                <button 
                                onClick={() => dispatch(editBlockUser(user._id))}
                                className="ml-auto p-2 bg-red-500 text-white rounded">
                                    Bỏ chặn Block
                                </button>
                            </div>
                        ))
                    }
                    {/* <div className="mt-4">
                        <h2>thông báo</h2>
                        
                    </div> */}
                </div>
            </div>
        </div>
     );
}
 
export default BlockUser;
