"use client"
import UserContext from '@/context/userContext'
import { deleteTaskOfUser, getTaskOfUser } from '@/services/taskServices'
import React, { useContext, useEffect, useState } from 'react'
import Task from './Task'
import { toast } from 'react-toastify'

const ShowTask = () => {
    const contextUser = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    
    async function loadTasks(userId) {
        try {
            const allTasks = await getTaskOfUser(userId)
            setTasks([...allTasks])
        } catch (error) {
            console.log(error)
            console.log("Fetch while getting an error")
        }
    }

    useEffect(()=>{
        if(contextUser.user){
            loadTasks(contextUser.user._id)
        }
    },[contextUser.user])
    
    // useEffect(() => {                                              //Stake hook may not be updated in asynchronous programing,.. use use effect to reflect any changes
    //     console.log(tasks);
    // }, [tasks]);


    async function deleteTaskParent(taskid){
        try{
            console.log(taskid)
            const result = await deleteTaskOfUser(taskid)
            const newTasks = tasks.filter((item)=>item._id != taskid)
            setTasks(newTasks)
            console.log(result)
            toast.success("Your Task is Deleted")
        }catch(error){
            console.log(error);
            // toast.error("Error Occured, Task not Deleted")
            toast.error("Failed to Delete the Task")
        }
    }
    return (
        <div className='grid grid-cols-12 mt-3'>
            <div className='col-span-8 col-start-3'>
                <h1 className="text-3xl text-center">Your Tasks({tasks.length})</h1>
                {tasks.map((task)=>(
                    <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
                ))}
            </div>
        </div>
    )
}

export default ShowTask