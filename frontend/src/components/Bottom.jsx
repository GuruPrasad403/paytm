import { useNavigate } from "react-router-dom"
import React from "react"
 function Bottom({text , link,linkText}){
    const navigate = useNavigate()
    return(
        <div className="text-center text-xl ">
            {text}<span className="mx-2 hover:text-gray-400 cursor-pointer" onClick={()=> navigate(link)}>{linkText}</span>
        </div>
    )
}

export default React.memo(Bottom)