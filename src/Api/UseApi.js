import React, { useState, useEffect, memo, useRef} from 'react'
import axios from 'axios'

const UseApi = (url, options) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const renderRef = useRef(true)

    const fetchData = async () => {
        setIsLoading(true)
        try{
            const response = await axios.get(url, options,);
            setData(response)
            console.log(response, "response")
        }
        catch(error){
            setError(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
    
        if(renderRef.current){
            renderRef.current = false
            fetchData()
        }
    },[])
 
  return { data, isLoading, error, fetchData}
}

export default UseApi
