import React from 'react'
import Navbar from "@/components/Navbar";
import Bookmark from '@/components/Bookmark';

const page = () => {
  return (
    <div className="grid grid-cols-12">
    <div className="col-span-2"><Navbar page='Bookmarks' /></div>
    <div className="col-span-10"><Bookmark /></div>
  </div>
  )
}

export default page