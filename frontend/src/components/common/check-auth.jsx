import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();

    // Cho phép người dùng chưa đăng nhập truy cập trang shop, ngoại trừ các trang yêu cầu đăng nhập như `/checkout` hoặc `/account`
    if (!isAuthenticated && location.pathname.startsWith('/shop')) {
        if (location.pathname.includes('/checkout') || location.pathname.includes('/account')) {
            return <Navigate to="/auth/login" state={{ from: location }} />;
        }
        return <>{children}</>;
    }

    // Logic cho các trang khác
    if (location.pathname === '/') {
        if (!isAuthenticated) {
            return <Navigate to="/shop/home" />;
        } else {
            return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/shop/home'} />;
        }
    }

    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to="/auth/login" />;
    }

    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/shop/home'} />;
    }

    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />;
    }

    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
};

export default CheckAuth;
