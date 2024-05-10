"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import BaseUrl from '@/lib/BaseUrl';

interface Post {
    loanRequestId: string;
    name: string;
    zipcode: string;
    bio: string;
    occupation: string;
    income: string;
    idDetails: string;
    idNumber: string;
    imageUploaded: string;
    loanAmount: number;
    loanCategory: string;
    timeDuration: string;
    loanDescription: string;
    repaymentStartDate: string;
    emiRepetition: string;
    userId: string;
    raising: number;
    createdAt: string;
}

const Bookmark = () => {
    const [progress, setProgress] = useState(50);
    const [name, setName] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("Access token not found. User not authenticated.");
            return;
        }

        BaseUrl.get("/api/loans/getBookMarks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setPosts(response.data); 
                } else {
                    throw new Error("Failed to fetch bookmarks");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        const storedName = localStorage.getItem("name");
        setName(storedName);
    }, []);

    return (
        <div className="flex flex-col items-start justify-around gap-8 p-8 ">
            <div className="text-[#4F46E5] text-3xl">Bookmark</div>
            {posts.map((post, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg w-full shadow-md p-4 mb-4 flex flex-col justify-between">
                    <div className="flex items-center mb-4">
                        <Image
                            src=""
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-black">{post.name}</span>
                    </div>
                    <p className="text-gray-800 mb-4">{post.loanDescription}</p>
                    <Image src={post.imageUploaded} alt="Post" className="w-full mb-4 rounded-lg" width={1200} height={800}/>
                    <div className="flex items-start gap-6 mb-6">
                        <div>Amount: <span className="text-[#808080]">{post.loanAmount}</span></div>
                        <div>Type: <span className="text-[#808080]">{post.loanCategory}</span></div>
                        <div>Duration: <span className="text-[#808080]">{post.timeDuration}</span></div>
                    </div>
                    <div className="mb-6"> <ProgressBar progress={progress} /></div>
                    <div className="flex items-start justify-between gap-6 mb-6">
                        <div>Raising: <span className="text-[#51DA21]">{post.raising}</span></div>
                        <div>Amount Left: <span className="text-[#51DA21]">{post.loanAmount - post.raising}</span></div>
                    </div>
                    <div className="flex items-start gap-4 justify-around">
                        <a href="/postDescription" className="text-center border-2 border-[#D9D9D9] text-black px-6 py-3 w-1/2 h-12 rounded-md">Read More</a>
                        <a href="/postDescription" className="text-center bg-[#4F46E5] text-white px-6 py-3 w-1/2 h-12 rounded-md">Support</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Bookmark;
