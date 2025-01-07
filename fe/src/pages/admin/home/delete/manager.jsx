import { getManager } from "@/store/admin";
import { Table, Input, Button, notification, Select, Tooltip, Modal, Image } from 'antd';
import { Edit, SearchIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminManager = () => {
    const [data, setData] = useState([])
    const dispath = useDispatch()
    const { dataManager } = useSelector(state => state.adminAuth)    
    const [isLoading, setIsLoading] = useState(false)
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [editingUsers, setEditingUsers] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const obj = { page: currentPage, limit: pageSize }
        dispath(getManager( obj))
        setIsLoading(true)
    }, [dispath, currentPage, pageSize])

    useEffect(() => {
        if (dataManager && dataManager.manager && dataManager.users.length > 0) { 
            setData(dataManager.users)
            setTotalUsers(dataManager.totalItems)
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [isLoading, dataManager])

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
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => {
                const maxLength = 5;
                if (text.length > maxLength) {
                    return (
                        <Tooltip title={text}>
                            {`${text.slice(0, maxLength)}...`}
                        </Tooltip>
                    )
                } else {
                    return text;
                }
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => {
                const maxLength = 5;
                if (text.length > maxLength) {
                    return (
                        <Tooltip title={text}>
                            {`${text.slice(0, maxLength)}...`}
                        </Tooltip>
                    )
                } else {
                    return text;
                }
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => {
                if (text === 'admin') {
                    return 'Admin'
                } else {
                    return 'User'
                }
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <div className="flex  items-center">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="link"
                            icon={<Edit />}
                            onClick={() => handleEditUsers(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="link"
                            icon={<Trash />}
                        />
                    </Tooltip>
                </div>
            )
        }
    ]

    const handlePageSizeChange = (value) => {
        setPageSize(value);
        setCurrentPage(1);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    const handleEditUsers = (user) => {
        setEditingUsers(user);
        setIsModalVisible(true);
    };
    const handleCancelModal = () => {
        setIsModalVisible(false);
        setEditingUsers(null);
    };
    const handleSaveUsers = () => {
        // Implement save logic here
        notification.success({
            message: 'User Updated',
            description: 'User details have been updated successfully',
        });
        setIsModalVisible(false);
        setEditingUsers(null);
    };

    return (
        <div className="h-full w-full px-5">
            <h1 className="text-2xl text-center">Danh sách người dùng</h1>
            <div className="py-5">
                <Input.Search
                    placeholder="Tìm kiếm theo email hoặc phone"
                    enterButton={<SearchIcon />}
                    size="large"
                />
            </div>
            <div className="mb-4">
                <Select
                    defaultValue={10}
                    style={{ width: 120 }}
                    onChange={handlePageSizeChange}
                >
                    <Select.Option value={5}>5 users/trang</Select.Option>
                    <Select.Option value={10}>10 users/trang</Select.Option>
                    <Select.Option value={20}>20 users/trang</Select.Option>
                    <Select.Option value={30}>30 users/trang</Select.Option>
                    <Select.Option value={100}>100 users/trang</Select.Option>
                </Select>
            </div>
            <div>
                <Table className="scale-95"
                    columns={columns} dataSource={data} rowKey={'_id'} loading={isLoading}
                    pagination={{ pageSize: pageSize, total: totalUsers, onChange: handlePageChange }} 
                />
                <Modal
                    title="Chỉnh sửa người dùng"
                    visible={isModalVisible}
                    onOk={handleSaveUsers}
                    onCancel={handleCancelModal}
                    width={500}
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            value={editingUsers?.email || ''}
                            onChange={(e) => setEditingUsers({
                                ...editingUsers,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <Input
                            type="text"
                            id="role"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            value={editingUsers?.role || ''}
                            onChange={(e) => setEditingUsers({
                                ...editingUsers,
                                role: e.target.value
                            })}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <Input
                            type="tel"
                            id="phone"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            value={editingUsers?.phone || ''}
                            onChange={(e) => setEditingUsers({
                                ...editingUsers,
                                phone: e.target.value
                            })}
                        />
                    </div>
                    <Button type="primary" onClick={handleSaveUsers}>
                        Save
                    </Button>
                </Modal>
            </div>
        </div>
    );
}

export default AdminManager;

