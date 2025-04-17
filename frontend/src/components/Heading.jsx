 import React from "react"
 function Heading ({heading}){

    return(
        <div className="text-center  ">
            <h1 className="text-5xl font-semibold font-sans w-full ">{heading}</h1>
        </div>
    )
}

export default React.memo(Heading)