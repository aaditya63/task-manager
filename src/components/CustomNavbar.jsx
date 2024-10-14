"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import UserContext from '@/context/userContext'
import { logout } from '@/services/userServices'
import { toast } from 'react-toastify'
const CustomNavbar = () => {
    const contextUser = useContext(UserContext)
    async function doLogOut(){
        try{
            const result = logout()
            contextUser.setUser(undefined)
        }catch(error){
            console.log(error)
            toast.error("Error Occured while Logout",{
                position:"top-right"
            })
        }
    }
    return (
        <nav className='text-white bg-blue-600 h-14 py-2 px-5 md:px-10 flex justify-between items-center'>
            <div className='brand text-1xl md:text-2xl font-semibold'>
                <h1><a href="/#!">Task Manager</a></h1>
            </div>
            <div>
                {
                    contextUser.user!=undefined && (
                        <ul className='flex text-sm space-x-2 md:space-x-5 md:text-2xl font-semibold'>
                            <Link href="/" className='hidden sm:block hover:text-blue-200'>Home</Link>
                            <Link href="/add-task" className='hover:text-blue-200'>Add Task</Link>
                            <Link href="/show-task" className='hover:text-blue-200'>Show Task</Link>
                        </ul>
                    )
                }
            </div>
            <div>
                <ul className='flex space-x-2 md:space-x-5 font-semibold'>
                    {
                        contextUser.user===undefined && (
                            <>
                                <li className='hover:text-blue-200'><Link href="/login">Login</Link></li>
                                <li className='hover:text-blue-200'><Link href="/signup">Signup</Link></li>
                            </>
                        )
                    }
                    {
                        contextUser.user && (
                            <>
                                <li className='hover:text-blue-200'><Link href="/">{contextUser.user.name}</Link></li>
                                <li className='hover:text-blue-200' onClick={doLogOut}><Link href="/">Logout</Link></li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default CustomNavbar