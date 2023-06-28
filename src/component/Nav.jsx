import React, { useState } from 'react'
import {CiLogout} from "react-icons/ci"
import {AiOutlineLink} from "react-icons/ai"
import {FaSlackHash} from "react-icons/fa"
import { useSession ,signIn, signOut, } from 'next-auth/react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addUrl } from '@/State/urlSlice';
export const Nav = () => {
  const [url,setUrl]=useState("");
  const [processing,setProcessing]=useState(false);
  const session =useSession();
  const dispatch=useDispatch();
  const user=session.data?.user;
  const handelShort=async(e)=>{
    e.preventDefault();
    const data={email:user.email,url:url,name:user.name};
    try {
      setUrl("");
      setProcessing(true);
      const response = await fetch('http://localhost:3000/api/hashUrl',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(res=>res.json());
      setProcessing(false);
      dispatch(addUrl(response))
    } catch (error) {
      console.log(error+"err");
    }
  }
  return (
    <div className=' flex gap-5 relative justify-center items-center flex-col border-b border-red-400 w-full h-1/2'>
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
            <button className={[processing | url.length===0?' h-9 rounded-sm px-3 cursor-not-allowed bg-slate-500':'bg-black h-9 rounded-sm px-3']} disabled={processing | url.length===0?true:false}onClick={e=>{handelShort(e)}}>{!processing?"Generate":"Processiing"}</button>
          </div>
          </>
        )
      }
    </div>
  )
}
