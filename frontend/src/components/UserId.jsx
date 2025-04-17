import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from './Button';
import { userContext } from '../context/UserContext';
import { Loader } from 'rsuite';
import { useNavigate } from 'react-router-dom';
function UserId() {
    const token = localStorage.getItem("PayTM-Token")
    const { allUser,setAllUser,setMoneyUser } = userContext()
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()    
    const getUserInfo = useCallback(async () => {
        setLoader(false)
        const response = await fetch("https://paytm-delta.vercel.app/api/v1/user/info", {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        setAllUser(data.users)
        console.log("all Useres",allUser)   
        setLoader(true)
    }, [token])
    useEffect(() => {
        getUserInfo();
      }, []);

    const handelSubmit = (e)=>{
        console.log("Button Clicked",)
        setMoneyUser(allUser[e.target.name])
        navigate("/send")   
    }
    return (
        <div>
            {
             loader ?  allUser?.map(((ele,i) => {
                    return (
                        <div key={ele._id}  className='flex justify-between items-center overflow-x-hidden px-6 border-b-1 py-5 mx-2'>
                            <div>
                                <div className='flex  justify-center items-center'>
                                    <span className='text-2xl md:text-4xl bg-gray-100 p-5 text-gray-800 cursor-pointer rounded-full '>{ele.name[0]}</span>

                                    <h1 className='text-2xl md:text-4xl p-2'>{ele.name}</h1>
                                </div>
                            </div>
                            <div>
                                <Button name={i} handelSubmit={handelSubmit} value={"Send Money"} />
                            </div>
                        </div>
                    )
                })) : <Loader />
            } 
        </div>
    )
}

export default React.memo(UserId)