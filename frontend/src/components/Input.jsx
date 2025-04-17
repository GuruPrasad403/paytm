 
 import React from "react"
 
 function Input({label,type,name,placeholder,value,setUserData,error}){
    return(
        <div className="flex flex-col justify-start  p-2 w-full h-full">
            <label htmlFor={name} className="text-xl font-semibold text-left">{label}</label>
            <input type={type} onChange={(e)=> setUserData(pre=> {
                return {
                    ...pre,
                   [e.target.name]:e.target.value
                }
            })} placeholder={placeholder} autoComplete={"off"} value={value} name={name} className="px-5 py-3 w-full outline-none border-2 my-2 text-white"/>
            <p className="text-md w-full text-red-300">{error}</p>
        </div>
    )
}


export default React.memo(Input)