import AdminNavBar from "@/components/admin/navBar";
import { Layout } from "antd";

import { Link, Outlet, useLocation } from "react-router";
const { Sider, Header, Content, Footer } = Layout;

const AdminHome = () => {
    const localtion = useLocation();
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width="250px" style={{ background: '#121212', color: '#1a2842' }}>
                    <AdminNavBar/>
                </Sider>
                <Layout style={{ background: "#e8f2f1" }}>
                    <Header style={{ padding: 0, background: 'white', height: '50px' }}>
                        <h1 className="text-[15px] pb-2 pl-10">
                            <Link
                                onClick={() => {
                                    localStorage.setItem('active', '0');
                                }}
                                to={'/admin/home'}>Admin Web</Link>
                        </h1>
                    </Header>
                    <div>
                        {/* path  router*/}
                        <div className="px-10 py-2">
                            {localtion.pathname}
                        </div>
                    </div>
                    <Content>
                        <Outlet />
                    </Content>

                </Layout>
            </Layout>
        </div>
    );
}

export default AdminHome;