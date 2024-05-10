"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import postImg from '../../public/post.svg';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
            <div
                className="bg-[#51DA21] text-white py-3 text-center"
                style={{ width: `${progress}%` }}
            >

            </div>
        </div>
    );
};


const Post = () => {

    const navItems = [
        { name: "All" },
        { name: "Women and Children" },
        { name: "Startup" },
        { name: "Potential Borrowers" }
    ];

    const [progress, setProgress] = useState(50);
   

    return (
        <div className="flex flex-col items-start justify-around gap-8 p-8">
            <p className="text-2xl text-[#4F46E5]">Welcome Taru!</p>
            <div className="flex items-start justify-between gap-6">
                {navItems.map((item, index) => (
                    <button key={index} className="rounded-full px-4 py-2 text-black hover:bg-[#4F46E5] hover:text-white">{item.name}</button>
                ))}
            </div>
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
    );
};

export default Post;
