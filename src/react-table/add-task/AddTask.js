import React, { useEffect, useRef, useState } from 'react'

const AddTask = (props) => {
    const { isAddTaskEnable, setTableData, tableData, editRowData, editTaskId, setIsAddTaskEnable, setEditTaskId } = props
    const [formData, setFormData] = useState({})

    const handleChange = (event) => {
        const { target } = event;
        setFormData((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        }));
      };    

    useEffect(() => {
        if(editTaskId){
            setIsAddTaskEnable(false)
            console.log(editRowData)
            setFormData(editRowData) 
        }
    }, [editTaskId])

    useEffect(() => {
        if(isAddTaskEnable){
            setFormData({
                name: "",
                date: "",
                updatedAt: "",
                description: "",
                developedBy: "",
                id: "",
                assignee:"",
                status:"",
                date:""
            })
        }
    }, [isAddTaskEnable])

    const nextTaskId = () => {
        let maxId = 0
        tableData.forEach((data) => {
            maxId = (maxId > data.id) ? maxId : data.id
        })
        return maxId +1
    }

    const submitRowData = () => {
        if(isAddTaskEnable){
            const date = new Date();
            const createdAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            const taskId = (tableData.length  <= 1) ? tableData.length + 1 : nextTaskId()
            const rowData= {...formData, date: createdAt, updatedAt: createdAt, id: taskId}
            setTableData([...tableData, rowData])
            setIsAddTaskEnable(false)
        }
        else{
            const date = new Date();
            const updatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            const updatedTaskData = tableData.map((rowData) => {
                if(rowData.id === editTaskId){
                    return {...formData, updatedAt: updatedDate}
                }
                return rowData
            })
            setTableData(updatedTaskData)
            setEditTaskId("")
        }
    }

    const closeTaskTab = () => {
        setEditTaskId("")
        setIsAddTaskEnable(false)
    }
    
    return (
        isAddTaskEnable || editTaskId ?
            <div className='bg-gray-600 max-w-lg h-96 flex flex-col w-3/4 rounded-lg gap-5 px-5 absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold py-5 text-center text-white'>{isAddTaskEnable ?'Add Task': 'Edit Task'}</h1>
                    <button className='font-semibold text-2xl text-red-400' onClick={closeTaskTab}>x</button>
                </div>
                <input className='h-9 rounded-lg mx-5 pl-2' value={formData?.name} placeholder='Enter task' onChange={handleChange} name='name'/>
                <input className='h-9 rounded-lg mx-5 pl-2' value={formData?.description} placeholder='Description' onChange={handleChange} name='description' />
                <input className='h-9 rounded-lg mx-5 pl-2'value={formData?.developedBy} placeholder='Developed By' onChange={handleChange} name='developedBy' />
                <input className='h-9 rounded-lg mx-5 pl-2' value={formData?.assignee} placeholder='Assignee' onChange={handleChange} name='assignee' />
                <input className='h-9 rounded-lg mx-5 pl-2' value={formData?.status} placeholder='Status' onChange={handleChange} name='status' />
                <button className='h-9 rounded-lg m-auto bg-blue-600 text-white w-1/3 mb-5' onClick={submitRowData}>Submit</button>
            </div>
            : <></>
    )
}

export default AddTask
