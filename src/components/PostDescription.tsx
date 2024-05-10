"use client"
import React, { useState } from 'react';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import postImg from '../../public/post.svg';

const PostDescription = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [userStoryClicked, setUserStoryClicked] = useState(false);
    const [progress, setProgress] = useState(50);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
        setUserStoryClicked(prevState => !prevState);
    };

    return (
        <div className="flex flex-col items-start justify-around p-8">
            <div className="flex gap-2 text-lg mb-6 cursor-pointer ">
                <span><MoveLeft /></span>
                <span>Users Story</span>
            </div>
            <p className="text-lg text-[#4F46E5] mb-8">Taru's Application</p>
            <div className="grid grid-cols-2 gap-8 mb-4">
                <div className="col-span-1"><Image src={postImg} alt="post Image" /></div>
                <div className="col-span-1">
                    <p className="mb-4">Pay :</p>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="text-center bg-[#4F46E5] text-white px-6 py-3 w-1/2 h-12 rounded-md mb-4">Lend</button>
                </div>
            </div>
            <p className="font-bold">Message : <span className="font-light">Lorem ipsum dolor sit amet asgdja baskdbaks asdjkasd ansndkjasd andskjda andka</span></p>
            <div className="flex items-start justify-between gap-6 mb-6">
                <div>Raising: <span className="text-[#51DA21]">200$</span></div>
                <div>Amount Left: <span className="text-[#51DA21]">200$</span></div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg overflow-hidden h-6 mb-4">
                <div className="bg-[#51DA21] text-white h-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex gap-6 mb-4">
                <p className={`hover:text-[#4F46E5] cursor-pointer ${userStoryClicked ? 'text-[#4F46E5]' : ''}`} onClick={toggleOptions}>Users Story</p>
                <p className="hover:text-[#4F46E5] cursor-pointer">Loan Detail</p>
            </div>
            {showOptions && (
                <div>
                    <p>Name : <span className="text-[#808080]">Taru Pathak</span></p>
                    <p>Occupation : <span className="text-[#808080]">Student</span></p>
                    <p>Income :  <span className="text-[#808080]">0</span></p>
                    <p>Bio :  <span className="text-[#808080]">Lorem Ipsum Dolor sit amet</span></p>
                </div>
            )}
        </div>
    );
};

export default PostDescription;
