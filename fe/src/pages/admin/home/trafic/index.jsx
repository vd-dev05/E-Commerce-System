
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTraficDate, getTraficUser } from "@/store/admin";
const AdminTrafic = () => {
    // const {traficUser} = useSelector(state => state.admin)
    const {payloadTraficUserChart} = useSelector(state => state.adminAuth) 

    const [chartData, setChartData] = useState({});
    const  dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTraficUser())
        dispatch(getTraficDate())
    },[dispatch])
    
    // useEffect(() => {
    //     if (payloadTraficUserChart && payloadTraficDateChart.length > 0) {
    //         const labels = payloadTraficDateChart.map(item => `${item._id.month}/${item._id.year}`); // Tháng/Năm

    //         // Chuyển dữ liệu thành định dạng cho biểu đồ
    //         setChartData({
    //             labels: labels,
    //             datasets: [
    //                 {
    //                     data: traficUser.map(item => item.newUserCount),
    //                     label: "Người dùng mới",
    //                     borderColor: "#3e95cd",
    //                     fill: false,
    //                 },
    //                 {
    //                     data: traficUser.map(item => item.violationUserCount),
    //                     label: "Người dùng vi phạm",
    //                     borderColor: "#8e5ea2",
    //                     fill: false,
    //                 },
    //                 {
    //                     data: traficUser.map(item => item.totalReviews || 0), // Nếu có dữ liệu lượt đánh giá
    //                     label: "Tổng số lượt đánh giá",
    //                     borderColor: "#3cba9f",
    //                     fill: false,
    //                 },
    //                 {
    //                     data: traficUser.map(item => item.totalUsers || 0), // Nếu có dữ liệu tổng số người dùng
    //                     label: "Tổng số người dùng",
    //                     borderColor: "#e8c3b9",
    //                     fill: false,
    //                 }
    //             ]
    //         });
    //     }
    // }, [payloadTraficUserChart]);
    console.log(payloadTraficUserChart);
    
    // const labelDate = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
    const labelDate = payloadTraficUserChart?.monthlyData?.map(item => {
        const month = item._id.month;
        const year = item._id.year;
        return `Tháng ${month}/${year}`;
    });
    //     const date = new Date(2024, i, 1);
    //     const month = date.toLocaleString('vi-VN', { month: 'long' });
    //     const year = date.getFullYear();
    //     return `${month} ${year}`;
    // });
    const totalUser = payloadTraficUserChart?.totalUserCount || 0;
    const newUser = payloadTraficUserChart?.monthlyData?.map(item => item.newUserCount) || [];
    const violationUser = payloadTraficUserChart?.monthlyData?.map(item => item.violationUserCount) || [];

    
    return (
        <div className="px-4">
            <h1 className="text-xl text-center">thống kê người dùng</h1>
            <div className="mt-4">
                <Line
                    data={{
                        labels:labelDate,
                        datasets: [
                            {
                                data:  newUser ,
                                label: "người dùng mới",
                                borderColor: "#3e95cd",
                                fill: false
                            },
                            {
                                data: violationUser,
                                label: "người dùng vi phạm",
                                borderColor: "#8e5ea2",
                                fill: false
                            },
                            // {
                            //     data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                            //     label: "Tổng số lượt đánh giá",
                            //     borderColor: "#3cba9f",
                            //     fill: false
                            // },
                            {
                                data: [ totalUser],
                                label: "Tổng số người dùng ",
                                borderColor: "#e8c3b9",
                                fill: false
                            }
                           
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "World population per region (in millions)"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }}
                />
            </div>
        </div>
    );
}



export default AdminTrafic;

