import React from 'react'
import Navbar from "@/components/Navbar";
import PostDescription from '@/components/PostDescription';

const page = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"><Navbar /></div>
      <div className="col-span-10"><PostDescription /></div>
    </div>
  )
}

export default page