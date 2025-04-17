import { useCallback, useState } from "react";
import Heading from "./Heading";
import Input from "./Input";
import { userContext } from "../context/UserContext";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Send() {
    const {moneyUser} = userContext()
    const navigate = useNavigate()
    const [amount, setAmount] = useState({
        amount: ""
    })
    const token = localStorage.getItem("PayTM-Token")
    const handelSubmit = useCallback(async()=>{
        try {
            const response = await fetch("https://paytm-delta.vercel.app/api/v1/account/transfer", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization:`Bearer ${token}`
                },
                body: JSON.stringify({
                    to:moneyUser.username,
                    amount: parseInt(amount.amount) 
                }),
              });
              const data =await response.json()
              console.log(data)
              if(data?.msg.startsWith("In"))
                toast.error(data?.msg)
              toast.success(data?.msg)
              setAmount("")
              setTimeout(()=> navigate("/"), 2000)
        } catch (error) {
            console.log("Error ", error)
            toast.error("Something Went Wrong")
        }
    }, [amount])
    return (
        <div className="flex justify-center items-center w-full h-screen overflow-x-hidden text-white bg-gray-800">
            <div className="flex justify-center gap-5  flex-col bg-gray-700 p-10">
                <div className="w-full my-5">
                    <Heading heading={"Send Money"} />
                </div>
                <div>
                    <div className='flex  justify-start items-center'>
                        <span className='text-4xl bg-gray-100 p-5 text-gray-800 cursor-pointer rounded-full '>{moneyUser?.name[0]}</span>

                        <h1 className='text-4xl p-2'>{moneyUser?.name}</h1>
                    </div>
                </div>
                <div>
                    <Input label={"Amount (INR)"} type={"number"} name="amount" placeholder="Enter Amount" value={amount.amount} setUserData={setAmount} error={null} />
                </div>

                <div>
                    <Button handelSubmit={handelSubmit} value={"Transfer Money"}/>
                </div>
            </div>
        </div>
    )
}