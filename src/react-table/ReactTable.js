import React, { useEffect, useMemo, useRef, useState } from 'react'
import Table from './table/Table'
import AddTask from './add-task/AddTask'

const ReactTable = () => {

    const [isAddTaskEnable, setIsAddTaskEnable] = useState(false)
    const [tableData, setTableData] = useState([])
    const [editRowData, setIsEditRowData] = useState({})
    const [editTaskId, setEditTaskId] = useState(false)
    const [searchFilter, setSearchFilter] = useState('')
    let renderRef = useRef(true)

    useEffect(() => {
      if(tableData.length > 0)
      window.localStorage.setItem("tableData", JSON.stringify(tableData))
    },[tableData])

    useEffect(() => {
      if(renderRef.current){
        renderRef.current = false
        const allTask = JSON.parse(window.localStorage.getItem("tableData"))
        setTableData(allTask)
      }
    },[])

    const isAddTaskClicked = ()=> {
      setEditTaskId(false)
      setIsAddTaskEnable(true)
    } 

    const handleEdit = (props) => {
      setEditTaskId(props?.row?.original?.id)
      setIsAddTaskEnable(false)
      setIsEditRowData(props?.row?.original)
    }

    const handleDelete = (props) => {
      const taskDeleteId = props?.row?.original?.id
      const updatedTableData = tableData.filter((data)=> (data.id !== taskDeleteId))
      setTableData(updatedTableData)
      if(tableData.length == 1)
      window.localStorage.setItem("tableData", JSON.stringify([]))
    }

    const handleFilterChange = (event) => {
      const value = event.target.value
      setSearchFilter(value)
    }

    const initialPageState = {
      pageSize: 10,
      pageIndex: 0
    };

    const columns = [
    {
      Header: 'TASK ID',
      accessor: 'id',
    }, 
    {
      Header: 'DATE',
      accessor: 'date',
    },
    {
      Header: 'TASK',
      accessor: 'name',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    },
    {
      Header: 'DEVELOPED BY',
      accessor: 'developedBy',
    },
    {
      Header: 'UPDATED AT',
      accessor: 'updatedAt',
    },
    {
      Header: 'ASSIGNEE',
      accessor: 'assignee',
    },
    {
      Header: 'Action',
      acessor: 'action',
      Cell: props => <div>
        <button className="bg-gray-600 mr-1 rounded-lg text-sm px-1 text-white" onClick={() => handleEdit(props)}>edit</button>
        <button className="bg-red-600 rounded-lg text-sm px-1 text-white" onClick={() => handleDelete(props)}>Delete</button>
      </div>
    }
  ]

  return (
    <div className='bg-gray-700 h-screen flex justify-center items-center box-border w-screen'>
      <div className='bg-gray-50 relative h-5/6 w-5/6 rounded-lg shadow-lg border'>
        <div className='flex justify-between'>
          <input className='m-5 rounded-md border-2 pl-2' placeholder='Search' onChange={handleFilterChange}></input>
          <button className='m-5 bg-blue-600 px-8 py-1 text-white rounded-md' onClick={isAddTaskClicked}>Add Task</button>
        </div>  
        <Table  columns={columns} 
                tableData={tableData} 
                searchFilter={searchFilter} 
                initialPageState={initialPageState} 
        />
        <AddTask  isAddTaskEnable = {isAddTaskEnable} 
                  setTableData= {setTableData} 
                  tableData={tableData} 
                  editRowData={editRowData} 
                  editTaskId={editTaskId} 
                  setIsAddTaskEnable={setIsAddTaskEnable} 
                  setEditTaskId={setEditTaskId}
        />
      </div>
    </div>
  )
}

export default ReactTable
