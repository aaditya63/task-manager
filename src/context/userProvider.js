"use client"
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { httpAxios } from '@/helper/httpHelper'
import { currentUser } from '@/services/userServices'

const UserProvider = ({children}) => {
  const [user,setUser] = useState(undefined)

  useEffect(()=>{
    async function load(){
        try{
            const cUser = await currentUser()
            setUser({...cUser})
        }catch(error){
            setUser(undefined)
        }
    }
    load()
  },[])

  return <UserContext.Provider value={{user,setUser}}>
    {children}
  </UserContext.Provider>
}

export default UserProvider