import React, { useCallback, useState } from "react";
import Bottom from "./Bottom";
import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";
import Subheading from "./SubHeading";
import toast  from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import {userContext} from "../context/UserContext";
 export default function Signin(){
    const [userData, setUserData] = useState({
        username:'',
        password:''
    })
   
    const {setUser} = userContext()
    const navigate = useNavigate()
    const handelSubmit = useCallback(async () => {
        console.log(userData)
        try {
         
          const response = await fetch("http://localhost:3000/api/v1/user/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
      
          const data = await response.json();
          console.log(data);
      
          if (data?.msg?.startsWith("Invalid ")) {
            toast.error(data.msg);
            
            return;
          }
      
          if (data?.msg?.startsWith("User Not")) {
            toast.error(data?.msg || "UserName Taken");
            return;
          }
      
          localStorage.setItem("PayTM-Token", data?.token);
      
          toast.success(data?.msg || "User Signed In");
          setUser(data?.user)
          setTimeout(() => navigate("/"), 1000);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }, [navigate,userData]);
      
      return(
        <div className="flex justify-around items-center md:w-full bg-gray-800   h-screen ">
           <div className="flex flex-col justify-around  bg-gray-700 text-white p-10 rounded-3xl w-full lg:w-4/12  "> 
                <div className="flex justify-around gap-10 items-center flex-col">
                <Heading heading={"Sign in"} />
                <Subheading subHeading={'Enter Your Information To Login'} />
           </div>    
           <div className="flex flex-col justify-around my-10 items-center h-full">
           <Input type={"text"} value={userData?.username} label={"Username"} name={"username"} placeholder={'Enter Your Username' } setUserData={setUserData} error={''}/>
           <Input type={"password"} value={userData?.password} label={"Password"} name={"password"} placeholder={'Enter Your Password   '} setUserData={setUserData} error={''}/>
           </div>
           <div className="w-full felx justify-center items-center  text-center ">
           <Button
            handelSubmit={handelSubmit}
           value={"Sign In"}/>
           </div>
           <Bottom
           text={"Don't have an account?"} linkText={"Sign-Up"} link={"/signup"}/>
            </div>
        </div>
    )
}

