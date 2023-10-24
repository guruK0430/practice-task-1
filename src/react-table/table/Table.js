import React, { useEffect } from 'react'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'

const Table = (props) => {
  const {columns, tableData: data, searchFilter, initialPageState:initialState} = props

  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    nextPage,
    previousPage,
    gotoPage,
    pageOptions,
    pageCount,
    setPageSize,
    state: {pageIndex, pageSize}
  } = useTable({
    columns, data, 
    initialState
  },
  useFilters,
  useSortBy,
  usePagination
  )

  useEffect(() => {
    setFilter('name', searchFilter)
  }, [searchFilter])

  const handlePageInput = (e) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(page);
  }

  return (
    <div>
      <table className='h-96 flex flex-col w-full' {...getTableProps()}>
        <thead className='w-full'>
          {headerGroups.map(headerGroup => (
            <tr className='h-10 flex justify-around items-center bg-gray-300 rounded-t-lg border-gray-300' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
              <th className='w-56 text-sm font-medium opacity-50 flex justify-center' {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')} 
                <span>
                  { column.isSortedDesc
                      ? ' ▼'
                      : ' ▲'
                  }
                </span>
              </th>
            ))}
            </tr>
          ))}
        </thead>
        <tbody className='w-full h-full overflow-auto' {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return(
              <tr className='bg-gray-100 border-b-2 border-gray-200 flex justify-around h-8 items-center' {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className='w-56 text-sm text-black font-medium  text-center ' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='flex justify-center items-center pt-2 gap-2'>
      <button className='bg-gray-300 rounded-lg font-bold text-gray-600 px-1 pb-1 hover:text-white' onClick={() => gotoPage(0)}>{"<<"}</button>
        <button className='bg-gray-300 rounded-lg font-bold text-gray-600 px-1 pb-1 hover:text-white' onClick={previousPage}>{"<"}</button>
        <button className='bg-gray-300 rounded-lg font-bold text-gray-600 px-1 pb-1 hover:text-white' onClick={nextPage}>{">"}</button>
        <button className='bg-gray-300 rounded-lg font-bold text-gray-600 px-1 pb-1 hover:text-white' onClick={() => gotoPage(pageCount - 1)}>{">>"}</button>
        <span>{pageIndex + 1} of {pageOptions.length} </span>
        <span>Go to page: <input className='border-gray-400 border w-12 pl-2' type='number' defaultValue={pageIndex + 1} onChange={handlePageInput} min={1}/></span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Table
