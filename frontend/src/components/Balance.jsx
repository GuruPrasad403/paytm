import React, { useCallback, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import SubHeading from './SubHeading';
import Button from './Button';
import toast from 'react-hot-toast';
function Balance(){
    const token = localStorage.getItem("PayTM-Token");
    const [balance,setBalance] = useState(100)
    const getBalance = useCallback(async()=>{
        console.log(token)
        try {
            const resposne = await fetch("http://localhost:3000/api/v1/account/balance",{
                method:'GET',
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            const data =await resposne.json()
            console.log(data)
            if(resposne.ok){
                setBalance(data?.balance)
                toast.success(data?.msg)
            }
        } catch (error) {
            
        }
    }, [token])
    useEffect(()=>{
        getBalance()
    }, [balance])
    return(
        <div className='flex justify-between flex-col md:flex-row p-5 overflow-x-hidden'>
            <div>
                <SubHeading subHeading={`Your current balance : ${balance} `}/>
            </div>
            <div className=' mt-10 md:mt-0'>
                <Button value={"Refresh Balance"} handelSubmit={getBalance}/>
            </div>
        </div>
    )
}


export default React.memo(Balance)