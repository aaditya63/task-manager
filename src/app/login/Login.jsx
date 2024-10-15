"use client"
import UserContext from '@/context/userContext'
import { login } from '@/services/userServices'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const router = useRouter()                       //Router from "next/navigation"
    const contextUser = useContext(UserContext)
    const loginHandler =async (e)=>{
        e.preventDefault()
        if(loginData.email.trim() === '' || loginData.password.trim() === ''){
            toast.info("Invalid Data",{
                position:"top-right"
            })
        }
        try{
            const result = await login(loginData)
            console.log(result)
            toast.success("Login Successful",{
                position:"top-right"
            })
            contextUser.setUser(result.user)
            router.push('/profile/user')                //Route to this link
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message,{
                position:"top-right"
            })
        }
    }
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-10 col-start-2 md:col-span-4 md:col-start-5'>
                <div className='py-5'>
                    <h1 className='text-3xl text-center'>Login Here</h1>
                    <form action="#!" onSubmit={loginHandler}>
                        <div className="my-2">
                            <input type="email" placeholder="Enter Email" className='w-full border p-2 rounded-2xl bg-gray-300 hover:font-semibold'
                                id='user_email' name='user_email' onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }} value={loginData.email} />
                        </div>
                        <div className="my-2">
                            <input type="password" placeholder="Enter Password" className='w-full border p-2 rounded-2xl bg-gray-300 hover:font-semibold'
                                id='user_password' name='user_password' onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }} value={loginData.password} />
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" className="bg-blue-400 m-4 px-3 py-1.5 rounded-lg hover:bg-blue-500">Login</button>
                            <Link href='/signup'><button type="button" className="bg-gray-200 m-4 px-3 py-1.5 rounded-lg hover:bg-gray-300">New User?</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}