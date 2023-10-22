import { deleteUrl, setSlice,updateIsDeleting } from '@/State/urlSlice'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {AiFillDelete,AiOutlineLoading} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
 const UrlTable = () => { 
  const dispatch=useDispatch();
  const obj_arr=useSelector(state=>state.urls.all_urls)
  const session= useSession();
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    const email = session?.data?.user?.email;
    const getUrls= async () => {
      setIsLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { email }
      };
      try {
            const  res= await axios.get('/api/findUrls',config);
            setIsLoading(false)
            return res.data;
        }
        catch (error) {
            console.log(error+" got error ");
            throw Error(error);
          }
    };
    getUrls().then(data=>{
      data.forEach(obj => {
        obj.isDeleting = false;
        console.log("pass\n")
      });
      dispatch(setSlice(data))
    })
  },[session, dispatch])
  const handleDelete=async (obj,e,key)=>{
    e.preventDefault(); 
    try {

       dispatch(updateIsDeleting({ key, isDeleting: true }));
      const response = await fetch('/api/deleteUrl', {
        method: 'POST',
        body: JSON.stringify({ id: obj.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        dispatch(deleteUrl(key));
      } else {
        dispatch(updateIsDeleting({ key, isDeleting: false }));
      }
    } 
    catch (error) {
      console.log(error)
    }
  }
  if(isLoading) return ( 
    <div class="flex items-center justify-center mx-auto my-16">
    <div class="w-4 h-4 bg-blue-400 rounded-full animate-ping duration-150 mx-2"></div>
    <div class="w-4 h-4 bg-green-400 rounded-full animate-ping duration-150 mx-2" style={{ animationDelay: '150ms' }}></div>
    <div class="w-4 h-4 bg-red-400 rounded-full animate-ping duration-150 mx-2"style={{ animationDelay: '300ms' }}></div>
</div>
  )
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
                  <tr key={url.id} className='row space-x-3 even:bg-gray-600 '>
                    <td className='col'>{key+1}</td>
                    <td className='col' data-header="Id:">{url.fullUrl?.length>30?url.fullUrl.slice(0,30)+"...":url.fullUrl}</td>
                    <td className='col'data-header="Title:">
                    {url?.fullUrl && url?.hashedUrl ? (
                  <Link href={url.fullUrl}>{url.hashedUrl}</Link>
                ) : (
                  'Missing URL Data'
                )}
                      {!url.isDeleting?<AiFillDelete className='inline text-red-400 mx-2 cursor-pointer' onClick={(e)=>handleDelete(url,e,key)}/>:<AiOutlineLoading className='inline text-red-400 mx-2 animate-spin'/>}</td>   
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