import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useLocation } from "react-router-dom";

const InfoBoard = () => {
    const [data, setData] = useState({})
    const location = useLocation();
    const id = Number(location.pathname.split("/")[2]);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(
          `http://localhost:8800/get_admin_info/${id}`
        );
        setData({id, ...res.data[0]})
      }
  
      fetchData()
    }, [id])
    
    const [time, setTime] = useState(moment());
    const [count, setCount] = useState({
        admin: 0,
        seller: 0,
        customer: 0
    })

    // This function will update the time every second
    const updateTime = () => {
        setTime(moment());
    };

    // This function will start the timer
    useEffect(() => {
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
              "http://localhost:8800/get_count_admin/"
            );
            const res1 = await axios.get(
              "http://localhost:8800/get_count_customer/"
            );
            const res2 = await axios.get(
              "http://localhost:8800/get_count_seller/"
            );
            
            setCount({
                admin: res.data[0].CTR,
                customer: res1.data[0].CTR,
                seller: res2.data[0].CTR,
            })
        }

        fetchData();
    }, [])

    return (
        <div className="flex flex-col space-y-4">
            <div className="mt-14 flex justify-between items-center bg-gradient-to-r from-[#F7CE68] to-[#FF5858] rounded-lg shadow-xl px-8 p-4">
                <div className="text-black ">
                    <h1 className="text-2xl font-bold">Welcome back, {data.firstname + " " + data.lastname}</h1>
                    <p className="text-lg font-semibold">Today is {time.format("MMMM DD, YYYY")} {time.format("HH:mm:ss")} </p>
                </div>
                <img src="/assets/imgs/announce.png" alt="" width={100} height={100}/>
            </div>
            <div className="grid grid-cols-3 space-x-4">
                <div className="flex items-center justify-between bg-[#F7CE68] rounded-lg shadow-xl pl-5 pr-4 py-4">
                    <div>
                        <h1 className="text-xl font-semibold">Registered Admin:</h1>
                        <p className="text-3xl font-bold">{count.admin}</p>
                    </div>
                    <img src="/assets/imgs/admin.png" alt="" width={100} height={100}/>
                </div>
                <div className="flex items-center justify-between bg-[#fc845e] rounded-lg shadow-xl pl-5 pr-4 py-4">
                    <div>
                        <h1 className="text-xl font-semibold">Registered Seller:</h1>
                        <p className="text-3xl font-bold">{count.seller}</p>
                    </div>
                    <img src="/assets/imgs/seller.png" alt="" width={100} height={100}/>
                </div>
                <div className="flex items-center justify-between bg-[#FF5858] rounded-lg shadow-xl pl-5 pr-4 py-4">
                    <div>
                        <h1 className="text-xl font-semibold">Registered Customer:</h1>
                        <p className="text-3xl font-bold">{count.customer}</p>
                    </div>
                    <img src="/assets/imgs/client.png" alt="" width={100} height={100}/>
                </div>
            </div>
        </div>
    )
}

export default InfoBoard;