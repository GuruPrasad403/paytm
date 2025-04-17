import React, { useCallback, useState } from "react";
import Bottom from "./Bottom";
import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";
import Subheading from "./SubHeading";
import toast  from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
 function Signup(){
    const [userData, setUserData] = useState({
        name : "",
        username:'',
        password:''
    })
    const [error,setError] = useState({
        name : "",
        username:"",
        password:""
    })
    const navigate = useNavigate()
    const handelSubmit =useCallback( async()=>{
            try {
                const response = await fetch("http://localhost:3000/api/v1/user/signup", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                  });
                const data = await response.json()
                console.log(data)
                if(data?.msg?.startsWith(" Incorrect ") ){
                toast.error(data.msg)
                setError((prev) => {
                    const newErrors = data?.error?.reduce((acc, ele) => {
                      acc[ele.path[0]] = ele.message;
                      return acc;
                    }, { ...prev });
                  
                    return newErrors;
                  });
                  return 0
                }

                if(data?.msg?.startsWith("Username"))
                  return  toast.error(data?.msg || "UserName Taken")

                localStorage.setItem("PayTM-Token", data?.jwt)
                toast.success(data?.msg || "User Created");
                setTimeout(()=>{ navigate("/") }, 2000)
            } catch (error) {
                console.log(error)
                toast.error('Something Went Wrong'  )
            }
    },[userData])
    return(
        <div className="flex justify-around items-center md:w-full bg-gray-800   h-screen ">
           <div className="flex flex-col justify-around  bg-gray-700 text-white p-10 rounded-3xl w-full lg:w-4/12  "> 
                <div className="flex justify-around gap-10 items-center flex-col">
                <Heading heading={"Sign up"} />
                <Subheading subHeading={'Enter Your Information To Create an Account'} />
           </div>    
           <div className="flex flex-col justify-around my-10 items-center h-full">
           <Input type={"text"} value={userData.username} label={"Username"} name={"username"} placeholder={'Enter Your Username' } setUserData={setUserData} error={error.username}/>
           <Input type={"text"} value={userData.name} label={"Name"} name={"name"} placeholder={'Enter Your Name   '} setUserData={setUserData} error={error.name}/>
           <Input type={"password"} value={userData.password} label={"Password"} name={"password"} placeholder={'Enter Your Password   '} setUserData={setUserData} error={error.password}/>
           </div>
           <div className="w-full felx justify-center items-center  text-center ">
           <Button
            handelSubmit={handelSubmit}
           value={"Sign In"}/>
           </div>
           <Bottom
           text={"Already have an account?"} linkText={"Sign-in"} link={"/signin"}/>
            </div>
        </div>
    )
}

export default React.memo(Signup)