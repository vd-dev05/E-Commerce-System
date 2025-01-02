import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router";

const SaleProducts = ({ }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [data , setData ] = useState(null)

    const slaleDataFake = [
        { hour: 1, items: [{ name: " 9", discount: 9 }, { name: " 9", discount: 9 }] },
        { hour: 2, items: [{ name: " 10", discount: 10 }, { name: " 10", discount: 10 }] },
        { hour: 3, items: [{ name: " 11", discount: 10 }, { name: " 11", discount: 10 }] },
    ]
    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + 1 * 60 * 60 * 1000; // 1 giờ
        localStorage.setItem('countdownStartTime', startTime);
        localStorage.setItem('countdownEndTime', endTime);
        // setData(slaleDataFake.map(item => item.items).find(item => item.hour === 1))
        setIsStarted(true);
    }, [])
    
  
    const fetchTimeLeft = async () => {
        const endTime = parseInt(localStorage.getItem('countdownEndTime'));
        const timeLeft = endTime - Date.now();
        setTimeLeft(timeLeft);
        
        // Nếu countdown đã hết, reset lại
        if (timeLeft <= 0) {
          setIsStarted(false);
        //   setData(slaleDataFake.map(item => item.items).filter(item => item.hour + 1 ))
          localStorage.removeItem('countdownStartTime');
          localStorage.removeItem('countdownEndTime');
        }

    };



    useEffect(() => {
        if (isStarted) {
            const intervalId = setInterval(fetchTimeLeft, 1000); // Gọi API mỗi giây để cập nhật thời gian
            // console.log(intervalId);
            
            if (timeLeft <= 0) {
                setIsStarted(false);
            }
            return () => clearInterval(intervalId);
        }
    }, [isStarted]);

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
    // console.log(data);
    

    return (
        <div className="py-5  ">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-10">
                    <h2 className="text-xl font-normal">Deal chớp nhoáng </h2>
                    <div >
                        <div>
                            {hours}:{minutes}:{seconds}
                        </div>

                    </div>
                </div>
                <Link>Xem tất cả</Link>
            </div>
            <div>
                {/* {data && data.map((item) => (
                    <div key={item.hour} className="flex justify-between items-center">
                        <div className="flex items-center gap-10">
                            <h2 className="text-xl font-normal">{item.hour}h</h2>
                        </div>
                        <div className="flex items-center gap-10">
                            <h2 className="text-xl font-normal">{item.items[0].name}</h2>
                            <h2 className="text-xl font-normal">{item.items[0].discount}</h2>
                        </div>
                        <div className="flex items-center gap-10">
                            <h2 className="text-xl font-normal">{item.items[1].name}</h2>
                            <h2 className="text-xl font-normal">{item.items[1].discount}</h2>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default SaleProducts;