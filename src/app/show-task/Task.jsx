import React from 'react'
import UserContext from '@/context/userContext'
import { useContext } from 'react'
import { ImCross } from "react-icons/im"

const Task = ({ task,deleteTaskParent }) => {

    const contextUser = useContext(UserContext)
    function deleteTask(taskid){
        deleteTaskParent(taskid)
    }
    return (
        <div className={`${task.status == "completed" ? "bg-green-200" : "bg-gray-200"} shadow-lg mt-2 rounded-md`}>
            <div className='p-5'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold'>{task.title}</h1>
                    <span onClick={()=>{deleteTask(task._id)}} className='hover:bg-slate-100 shadow-lg rounded-full bg-white w-8 h-8 flex justify-center items-center cursor-pointer'> 
                        <ImCross />
                    </span>
                </div>
                <p className='font-normal'>{task.content}</p>
                <div className='flex justify-between mt-3'>
                    <p className='text-left'>Status:<span className='font-bold'>{task.status}</span></p>
                    <p className='text-right'>Author:<span className='font-bold'>{contextUser.user?.name}</span></p>
                </div>

            </div>
        </div>
    )
}

export default Task