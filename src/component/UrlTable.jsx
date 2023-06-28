import { addUrl, deleteUrl, getDefault, setSlice } from '@/State/urlSlice'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {AiFillDelete,AiOutlineLoading} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'

 const UrlTable = () => { 
  const dispatch=useDispatch();
  const obj_arr=useSelector(state=>state.urls.all_urls)
  const session= useSession();
  const [deleteing,setDeleting]=useState(false)
  const getUrls= async () => {
    try {
          const res = await fetch('http://localhost:3000/api/findUrls', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session?.data?.user?.email }),
          });
          const data= await res.json();
          return data;
      }
      catch (error) {
          console.log(error+" got error ");
          throw error
        }
  };
useEffect(()=>{
  getUrls().then(data=>{dispatch(setSlice(data))})
},[])
  const handleDelete=async (id,e,key)=>{
    setDeleting(true)
    e.preventDefault();
    try {
        const response=await fetch('http://localhost:3000/api/deleteUrl',{
        method:"POST",
        body:JSON.stringify({id:id}),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      response.status===200?dispatch(deleteUrl(key)):dispatch(getDefault)
      setDeleting(false)
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (<>
  {
      obj_arr.length===0?(
          <h2 className='mx-[35%] text-xl '>No data to show</h2>
        ):(
        <div className="w-full">
          <table className='mx-auto w-[80%] max-w-xl   mt-4'>
            <thead>
            <tr className='border-b-2 border-red-400'>
                <th>Sl.No</th>
                <th>Full URL</th>
                <th>Hashed URL</th>
            </tr>
            </thead>
            <tbody>
             {
            obj_arr.map((url,key)=>{
                  return(
                  <tr key={key} className='row space-x-3 even:bg-gray-600 '>
                    <td className='col'>{key+1}</td>
                    <td className='col' data-header="Id:">{url.fullUrl.length>30?url.fullUrl.slice(0,30)+"...":url.fullUrl}</td>
                    <td className='col'data-header="Title:"><Link href={url.fullUrl}>{url.hashedUrl}</Link>{!deleteing?<AiFillDelete className='inline text-red-400 mx-2 cursor-pointer' onClick={(e)=>handleDelete(url.id,e,key)}/>:<AiOutlineLoading className='inline text-red-400 mx-2'/>}</td>   
                  </tr>
                  )
              })
            }
            </tbody>
        </table>
      </div>
      )
      }
      </>
    )
}
export default UrlTable