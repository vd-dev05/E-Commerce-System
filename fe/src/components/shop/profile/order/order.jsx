import { Link } from "react-router";

const OrderProfile = () => {
    let DataFake = []

    for (let index = 0; index < 10 ; index++) {
        DataFake.push({
            id : index + 1,
            name : `${Math.random().toString(36).substring(7)}`
        })
    }
    console.log(DataFake);
    // let dataFakeSale = [];
    // for (let i = 0; i < 12; i++) {
    //     dataFakeSale.push({
    //         hour: i + 1,
    //         items: Array.from({ length: 6 }, (_, index) => ({
    //             name: `${Math.random().toString(36).substring(7)}`,
    //             url: 'https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_400x400q80.jpg_.avif',
    //             price: Math.random() * 100000,
    //             path: '/shop/men',
    //             id: index + 1,
    //             discount: Math.random() * 9000,
    //             discount_type : `${Math.floor(Math.random() * 40)}`,
    //         }))
    //     });
    // }
    return ( 
        <div>
            <div className="flex justify-between px-5">
                {/* roure  */}
                <Link 
                to={'?id=notbuy'}
                >Chưa Đặt</Link>
                <Link
                to={'?id=success'}
                >Đã Đặt</Link>
                <Link
                to={'?id=progess'}
                >Chờ Xác Nhận </Link>
                <Link
                to={'?id=shiping'}
                >Đang vận chuyển</Link>
                <Link
                to={'?id=shipsuccess'}
                >Giao hàng thành công</Link>
                <Link
                to={'?id=notTrue'}
                >Đã hủy</Link>
            </div>
        </div>
    );
}
 
export default OrderProfile; 