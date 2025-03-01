import { useState } from "react";

const SaleUser = () => {
    const [sale ,setSale] = useState()
    const handleUpdate  =  async  () => {
        const response = await fetch(`http://localhost:5000/api/v1/admin/cacheUpdateTime`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                sale
            })
        })
        // console.log(response);
        
        
    }
    return ( 
        <div className="p-2 flex gap-4">
            <input
            placeholder="Nhập thời gian sale"
            onChange={(e) => setSale(e.target.value)}
            type="text" />
            <button
            onClick={() => handleUpdate()}
            >Xác nhận</button>
        </div>
     );
}
 
export default SaleUser;