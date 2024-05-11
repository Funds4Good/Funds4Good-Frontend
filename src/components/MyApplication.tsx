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
    loanDuration: string;
    loanDescription: string;
    repaymentStartDate: string;
    emiRepetition: string;
    userId: string;
    raising: number;
    createdAt: string;
}

const MyApplications = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string | null>(null);
    const [applications, setApplications] = useState<Post[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("Access token not found. User not authenticated.");
            return;
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        BaseUrl.get("api/loans/getUserLoans", config)
            .then((response: { status: number; data: React.SetStateAction<Post[]>; }) => {
                if (response.status === 200) {
                    setApplications(response.data)
                } else {
                    throw new Error("Failed to fetch posts");
                }
            })
            .catch((error: any) => {
                console.error("Error:", error);
            });

        const storedName = localStorage.getItem("name");
        setName(storedName);
    }, []);

    return (
        <div className="flex flex-col items-start justify-around gap-8 p-8 ">
            <div className="text-[#4F46E5] text-3xl">My Applications</div>
            {applications.map((application) => (
                <div key={application.loanRequestId} className="bg-white border border-gray-200 rounded-lg w-full shadow-md p-4 mb-4 flex flex-col justify-between">
                    <div className="flex items-center mb-4">
                        <span className="text-black font-bold">{application.name}</span>
                    </div>
                    <p className="text-gray-800 mb-4">{application.loanDescription}</p>
                    <Image src={"https://funds4good.pranavbisaria.live" + application.imageUploaded} alt="Post" className="w-full mb-4 rounded-lg" width={1200} height={800} />
                    <div className="flex items-start gap-6 mb-6">
                        <div>Amount: <span className="text-[#808080]">{application.loanAmount}</span></div>
                        <div>Type: <span className="text-[#808080]">{application.loanCategory}</span></div>
                        <div>Duration: <span className="text-[#808080]">{application.repaymentStartDate}</span></div>
                    </div>
                    <div className="mb-6"> <ProgressBar progress={application.raising / application.loanAmount * 100} /></div>
                    <div className="flex items-start justify-between gap-6 mb-6">
                        <div>Raising: <span className="text-[#51DA21]">{application.loanAmount}</span></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyApplications;
