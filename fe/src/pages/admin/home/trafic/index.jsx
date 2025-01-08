
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTraficUser } from "@/store/admin";
const AdminTrafic = () => {
    // const {traficUser} = useSelector(state => state.admin)
    const  dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTraficUser())
    },[dispatch])
    // console.log(traficUser);
    const labelDate = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
    return (
        <div className="px-4">
            <h1 className="text-xl text-center">thống kê người dùng</h1>
            <div className="mt-4">
                <Line
                    data={{
                        labels:labelDate,
                        datasets: [
                            {
                                data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478,12],
                                label: "người dùng mới",
                                borderColor: "#3e95cd",
                                fill: false
                            },
                            {
                                data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                                label: "người dùng vi phạm",
                                borderColor: "#8e5ea2",
                                fill: false
                            },
                            {
                                data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                                label: "Tổng số lượt đánh giá",
                                borderColor: "#3cba9f",
                                fill: false
                            },
                            {
                                data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
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
