import React, { useState } from 'react'
import axios from 'axios'
import {CiLogout} from "react-icons/ci"
import {AiOutlineLink} from "react-icons/ai"
import {FaSlackHash} from "react-icons/fa"
import { useSession ,signIn, signOut, } from 'next-auth/react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addUrl } from '@/State/urlSlice';
import {AiOutlineLoading} from "react-icons/ai"
export const Nav = () => {
  const [url,setUrl]=useState("");
  const [processing,setProcessing]=useState(false);
  const session =useSession();
  const dispatch=useDispatch();
  const user=session.data?.user;
  const handelShort=async(e)=>{
    e.preventDefault();
    const newData={email:user.email,url:url.trimStart(),name:user.name};
    try {
      setProcessing(true);
      const response= await axios.post('/api/hashUrl', newData, {
        headers: {
          'Content-Type': 'application/json',
        }
      }) 
      newData.hashedUrl=response.data.hashedUrl;
      setUrl("");
      setProcessing(false);
      response.data.isDeleting=false;
      dispatch(addUrl(response.data))
    } catch (error) {
      console.log(error)
      if(error.response.data.error==="connect ECONNREFUSED ::1:80k_")
        window.alert("Invaild URL or URL is not reachable");
      else 
        window.alert("Error: Check this url might esist already");
      setProcessing(false);
    }
  }
  return (
    <div className=' flex gap-5 relative justify-center items-center flex-col border-b border-red-400 w-full h-[50svh]'>
      <h3 className='text-4xl'><FaSlackHash className='inline bg-blue-600 rounded-lg p-1 '/> Hashify</h3>
      {
        session.status!='authenticated'?(
          <>
            <h3 className='text-xl'>You must Login First</h3>
            <button className=' fixed mr-2 right-0 top-3 duration-500 ease-in-out border-red-400 border-2 rounded-xl p-2 hover:bg-red-400 hover:text-white ' onClick={()=>void signIn()}>Sign In</button>
          </>
        ):(
          <>
          <h3 className='text-2xl'>Welcome {user.name}</h3>
          <div className='border-1 border-red-500 fixed mr-2 right-0 top-3 mt-2 after:top-1.5 after:-right-2.5 after:bg-gray-900 after:w-2 after:h-8 after:absolute w-12 h-12 border-2 rounded-xl cursor-pointer group'>
            <span className="w-24 rounded-lg pr-3 h-8 top-1.5 translate-x-[17rem] duration-500 group-hover:translate-x-0 -start-20 absolute  text-white border-red-500 border-2 bg-red-500" onClick={()=>void signOut()}><CiLogout className='inline font-bold mr-0.5'/>LogOut</span>
            <Image
              src={user.image}
              width={100}
              height={100}
              alt='user Image'
              className='absolute  rounded-xl'/>
          </div>
          <div className="w-[80%] max-w-lg rounded-lg p-1 flex items-center justify-around h-14 bg-white">
            <label htmlFor="url"><AiOutlineLink className='text-gray-900'/></label>
            <input type="text" placeholder="Enter your URL"name="url"className='pl-1 w-[70%]  focus:outline-none focus:border-b-2 border-black text-black' value={url}onChange={e=>setUrl(e.target.value)}/>
            <button className={[processing | url.length===0?' h-9 rounded-sm px-3 cursor-not-allowed bg-slate-500':'bg-black h-9 rounded-sm px-3']} disabled={processing | url.length===0?true:false}onClick={e=>{handelShort(e)}}>{!processing?"Generate":<AiOutlineLoading className='inline text-white  mx-2 animate-spin'/>}</button>
          </div>
          </>
        )
      }
    </div>
  )
}
