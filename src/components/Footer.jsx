"use client"
import React from 'react'

const Footer  = () => {
  return (
    <div className='h-72 bg-slate-600'>
        <div className=' flex justify-around text-white p-5'>
            <div className='w-1/3 md:w-2/4'>
                    <h1 className='text-2xl sm:text-5xl'>Work Manager</h1>
                    <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit.<span className='hidden md:block'> Voluptate possimus ipsa fuga neque fugit error hic in! Minus voluptate aperiam iusto numquam! Totam sunt error quia minus delectus illum quos?</span></p>
            </div>
            <div className='w-2/3 md:w-2/4 flex justify-around'>
                <div>
                        <p className='mb-2'>Important Links</p> 
                        <ul>
                            <li>Home</li>
                            <li>Add Tasks</li>
                            <li>Show Tasks</li>
                            <li>Login</li>
                            <li>Signup</li>
                            <li>FAQs</li>
                        </ul>
                </div>
                <div className=' w-1/4'>
                        <p className='mb-2'>Social Media</p> 
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                        </ul>
                </div>
            </div>
        </div>
        <div>
            <p className='text-center mt-2 md:mt-8 text-white font-extrabold'>
                Made with Love and Code..
            </p>
        </div>
    </div>
  )
}

export default Footer 