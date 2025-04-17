import React,{ createContext, useCallback, useContext, useEffect, useState } from "react";

const UserContext = createContext()
export const userContext = ()=>{
    return useContext(UserContext)
}

const UserProvider = ({children})=>{
    const [user,setUser] = useState()
    const [allUser,setAllUser] = useState()
    const [moneyUser, setMoneyUser] = useState()
    return(
      <UserContext.Provider value={{user,setUser,setAllUser,allUser,moneyUser,setMoneyUser}}>
        {children}
      </UserContext.Provider>  
    )
}

export default UserProvider