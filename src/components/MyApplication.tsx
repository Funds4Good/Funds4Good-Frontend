"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import Post from './Post'
import postImg from '../../public/post.svg';
import ProgressBar from './ProgressBar';

const MyApplications = () => {
    const [progress, setProgress] = useState(50);
    return (
        <div className="flex flex-col items-start justify-around gap-8 p-8 "><div className="text-[#4F46E5] text-lg ">My Applications</div>
            <div className="bg-white border border-gray-200 rounded-lg w-full shadow-md p-4 mb-4 flex flex-col justify-between">
                <div className="flex items-center mb-4">
                    <Image
                        src=""
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-black">Taru Pathak</span>
                </div>
                <p className="text-gray-800 mb-4">I need loan for my operation</p>
                <Image src={postImg} alt="Post" className="w-full mb-4 rounded-lg" />
                <div className="flex items-start gap-6 mb-6">
                    <div>Amount: <span className="text-[#808080]">4000</span></div>
                    <div>Type: <span className="text-[#808080]">No interest</span></div>
                    <div>Duration: <span className="text-[#808080]">24 months</span></div>
                </div>
                <div className="mb-6"> <ProgressBar progress={progress} /></div>
                <div className="flex items-start justify-between gap-6 mb-6">
                    <div>Raising: <span className="text-[#51DA21]">200$</span></div>
                    <div>Amount Left: <span className="text-[#51DA21]">200$</span></div>
                </div>
                <div className="flex items-start gap-4 justify-around">
                    <a href="/postDescription" className="text-center border-2 border-[#D9D9D9] text-black px-6 py-3 w-1/2 h-12 rounded-md">Read More</a>
                    <a href="/postDescription" className="text-center bg-[#4F46E5] text-white px-6 py-3 w-1/2 h-12 rounded-md">Support</a>
                </div>
            </div>
        </div>

    )
}

export default MyApplications