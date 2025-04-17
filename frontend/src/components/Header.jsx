import React from 'react'
import Heading from './Heading'
import { userContext } from '../context/UserContext'
function Header(){
        const {user} = userContext()
    return(
        <div className='flex justify-between items-center py-10 px-5 shadow-2xl drop-shadow-2xl rounded-b-3xl  '>
            <div>
                <Heading heading={"PayTM"} />
            </div>
            <div >
                    <div className='flex  justify-center items-center'>
                        <h1 className='text-4xl p-2'>{user?.username || "Hello"}</h1>
            <span className='text-4xl bg-gray-100 p-5 text-gray-800 cursor-pointer rounded-b-full '>{user?.name[0]}</span>
                    </div>
            </div> 
        </div>
    )
}

export default React.memo(Header)