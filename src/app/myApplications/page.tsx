import React from 'react'
import Navbar from "@/components/Navbar";
import MyApplications from '@/components/myApplication';

const page = () => {
  return (
    <div className="grid grid-cols-12">
    <div className="col-span-2"><Navbar /></div>
    <div className="col-span-10"><MyApplications /></div>
  </div>
  )
}

export default page