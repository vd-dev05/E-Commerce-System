import { getUser } from "@/store/admin";
import { Table, Input, Button, notification, Select, Tooltip, Modal, Image } from 'antd';
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminUser = () => {
    const [data, setData] = useState([])
    const dispath = useDispatch()
    const { dataUser } = useSelector(state => state.adminAuth)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispath(getUser())
        if (dataUser) {
            setData(dataUser)
            setIsLoading(false)
        }

    }, [dispath])


    if (isLoading) {
        return (<div>Loading ..</div>)

    }

    // model ant 
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => {
              const idString = text;
              if (idString) {
                return `${idString.slice(0, 6)}***`;
              }
            },
          },
        //   {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        //     render: (text) => {
        //       const maxLength = 5;
        //       if (text.length > maxLength) {
        //         return (
        //           <Tooltip title={text}>
        //             {`${text.slice(0, maxLength)}...`}
        //            </Tooltip>
        //         )
        //       } else {
        //         return text;
        //       }
        //     }
        //   }
]
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
            <div>
                {/* <Table columns={columns} dataSource={data} /> */}
            </div>
        </div>
    );
}

export default AdminUser;