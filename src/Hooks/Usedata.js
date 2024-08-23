import React,{useState, useEffect} from 'react'
import apiClient from '../utils/api-client'

const Usedata = (endpoint, customConfig, deps) => {
    const [data, setData] = useState(null)
    const [error, seterror] = useState("")
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
      setisLoading(true)
      apiClient.get(endpoint, customConfig).then(res => {
        if(endpoint==="/products" && data && data.products && customConfig.params.page!=1)
        {
               setData(prev=> ({
                ...prev, products:[...prev.products, ...res.data.products]
               }))
        }
        else{
          setData(res.data);
        }
      setisLoading(false)}).catch(err => {seterror(err.message)
        setisLoading(false);
      });
    }, deps ? deps: [])
  return    {data,error, isLoading};
  
}

export default Usedata;
