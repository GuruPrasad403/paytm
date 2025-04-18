import React, { useCallback, useState } from "react"
import Heading from "./Heading"
import Search from "./Search"
import UserId from "./UserId"
import Button from "./Button"
import toast from "react-hot-toast"
import { userContext } from "../context/UserContext"
function User(){
     const token = localStorage.getItem("PayTM-Token")
        const { allUser,setAllUser } = userContext()
        const [loader,setLoader] = useState(false)
        const getUserInfo = useCallback(async () => {
            setLoader(false)
          try {
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
            toast.success("Data Base Refreshed")
          } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
          }
        }, [token])
    return(
        <div className="fex flex-col w-full h-screen overflow-x-hidden">
            <div className="flex justify-between px-5 items-centers">
                <Heading heading={"User"}/>
                <div className="">
                <Button handelSubmit={getUserInfo} value={"Refresh Users. . .  "}/>
                </div>
            </div>
            <div className="w-full">
                <Search />
            </div>
            <div>
                <UserId />
            </div>
        </div>
    )
}
export default React.memo(User)
