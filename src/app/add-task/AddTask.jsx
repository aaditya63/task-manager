"use client"
import React, { useState } from 'react'
import todosvg from '../../assets/todoSvg.svg'
import Image from 'next/image';
import { addTask } from '@/services/taskServices';
import { toast } from 'react-toastify';


const AddTask = () => {

  const [task,setTask] = new useState({
    title:"",
    content:"",
    status:"none",
    userId:""  
  })
  function clearAddTask(){
    setTask({
      title:"",
      content:"",
      status:"none",
      userId:""  //Hard Coded -- needs to be updated
    })
  }

  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log(e.target)
    // console.log(e.target)  --  from which DOM object this is triggering - Practice this
    
    //Validation Task Data
    if(task.title.length==0 || task.content.length==0 || task.status=='none'){
      toast.error("Fill All the Feilds!!",{
        position:"top-right"
      })
      return
    }
    try{
      const result = await addTask(task)
      toast.success("Your Task is Added",{
        position:'top-right'
      })
      clearAddTask()

    }catch(error){
      console.log(error)
      toast.error("Your Task is not Added",{
        position:'top-right'
      })
    }
  }

  return (
    <div className='grid grid-cols-12'>
      <div className=' col-span-6 col-start-4 border shadow shadow-gray-300 rounded-3xl p-3 my-5'>
      <Image src={todosvg} alt='Img is Loading' priority='false' style={{height:"90px"}}/>
        <h1 className='text-center'>Add your Task here!</h1>
        <form action="#!" onSubmit={handleAddTask}>
          <div className="mt-4">
            <input type="text"  placeholder="Enter Title" className='w-full border p-3 rounded-2xl bg-gray-300 hover:font-semibold' 
                id='task_title' name='task_title' onChange={(e)=>{setTask({...task,title:e.target.value})}} value={task.title}/>
          </div>
          <div className="mt-4">        
            <textarea rows="5" placeholder="Enter Content" className='w-full border p-3 rounded-2xl bg-gray-300 hover:font-semibold resize-none' 
                id='task_content' name='task_content' onChange={(e)=>{setTask({...task,content:e.target.value})}} value={task.content}/>
          </div>
          <div className="mt-4">
            <select name="" id="task_status" className='w-full p-3 rounded-2xl bg-gray-300 border-none'
                  onChange={(e)=>{setTask({...task,status:e.target.value})}} value={task.status}>
              <option value="none" disabled>Select Work Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className='mt-4 flex justify-center'>
            <button type='submit' className='bg-blue-400 rounded-lg py-2 px-3 hover:bg-blue-500 mr-4'>Add Task</button>
            <button type='button' onClick={()=>clearAddTask()} className='bg-gray-200 rounded-lg py-2 px-3 hover:bg-gray-300'>Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask