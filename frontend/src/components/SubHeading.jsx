 import React from "react"
 
 function Subheading ({subHeading}){

    return(
        <div className="text-center  ">
            <h1 className="text-3xl  font-sans w-96">{subHeading}</h1>
        </div>
    )
}


export default React.memo(Subheading)

