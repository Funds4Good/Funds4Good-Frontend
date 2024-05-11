"use client"

import React from 'react'
import Navbar from "@/components/Navbar";
import PostDescription from '@/components/PostDescription';
// import { useLocation } from 'react-router-dom';

const page: React.FC = () => {
  // const location = useLocation();
  // const { state: { post } } = location;
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"><Navbar page='Home' /></div>
      <div className="col-span-10"><PostDescription /></div>
    </div>
  )
}

export default page;