"use client"

import { useState } from "react"
import signupSvg from "../../assets/signupSvg.svg"
import Image from "next/image"
import { toast } from "react-toastify"
import signUp from "@/services/userServices"

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: "https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png"
    })
    function resetUser(){
        setUser({
            name: "",
            email: "",
            password: "",
            about: "",
            profileURL: "https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png"
        })
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        if (user.name.trim() === "" || user.name == null) {
            toast.warning("Name is Required", {
                position: "top-right"
            })
            return
        }
        try {
            const result = await signUp(user)
            console.log(result)
            toast.success("Registration Successfull", {
                position: 'top-right'
            })
            resetUser()
        } catch (error) {
            toast.error("Registration Failed !!,.."+ error.response.data.message,{
                position:'top-right'
            })
        }
    }
    return (
        <div className="md:grid md:grid-cols-12 my-10">
            <div className="md:col-span-6 md:col-start-1 flex justify-center items-center">
                <Image src={signupSvg} alt="Signup SVG" className="h-44 md:h-96" priority='false'  />
            </div>
            <div className="col-span-5 col-start-7 border rounded-lg shadow shadow-gray-300 p-8 md:p-3">
                <form action="" onSubmit={signupHandler}>
                    <div>
                        <h1 className="text-2xl text-center">Signup Here</h1>
                    </div>
                    <div className="mt-3">
                        <div className="my-2">
                            <input type="text" placeholder="Enter Name" className='w-full border p-2 rounded-2xl bg-gray-300 hover:font-semibold'
                                id='user_name' name='user_name' onChange={(e) => { setUser({ ...user, name: e.target.value }) }} value={user.name} />
                        </div>
                        <div className="my-2">
                            <input type="email" placeholder="Enter Email" className='w-full border p-2 rounded-2xl bg-gray-300 hover:font-semibold'
                                id='user_email' name='user_email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} value={user.email} />
                        </div>
                        <div className="my-2">
                            <input type="password" placeholder="Enter Password" className='w-full border p-2 rounded-2xl bg-gray-300 hover:font-semibold'
                                id='user_password' name='user_password' onChange={(e) => { setUser({ ...user, password: e.target.value }) }} value={user.password} />
                        </div>
                        <div className="my-2">
                            <textarea placeholder="About Yourself" className='w-full border p-2 rounded-2xl bg-gray-300 hover:font-semibold resize-none' rows="4"
                                id='user_about' name='user_about' onChange={(e) => { setUser({ ...user, about: e.target.value }) }} value={user.about}></textarea>
                        </div>
                        <div className="my-2">
                            <input disabled type="text" placeholder="Enter Profile URL" className='w-full border p-3 rounded-2xl bg-gray-300'
                                id='profileURL' name='profileURL' onChange={(e) => { setUser({ ...user, profileURL: e.target.value }) }} value={user.profileURL} />
                        </div>
                    </div>
                    <div className="text-center flex justify-center">
                        <button type="submit" className="bg-blue-400 m-4 px-3 py-1.5 rounded-lg hover:bg-blue-500">Signup</button>
                        <button type="button" className="bg-gray-200 m-4 px-3 py-1.5 rounded-lg hover:bg-gray-300" onClick={resetUser}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}