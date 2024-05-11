"use client"

import React, { useEffect, useState } from 'react';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import postImg from '../../public/post.svg';
import { Transaction, SystemProgram, PublicKey, Connection } from '@solana/web3.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '@/lib/BaseUrl';
import { useRouter } from 'next/navigation';
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
    bookMarked : boolean;
    receiverId: string
}
const PostDescription = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [userStoryClicked, setUserStoryClicked] = useState(false);
    const [progress, setProgress] = useState(50);
    const [post, setPost] = useState<Post>();
    const [pay, setPay] = useState<number | bigint>(0);

    const router = useRouter()
    useEffect(() => {
        const loanId = localStorage.getItem("requestid")
        if (!loanId)
            toast.error("no request")
        else {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.error("Access token not found. User not authenticated.");
                return;
            }
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            };
            BaseUrl.get(`api/loans/get/${loanId}`, config)
                .then((res) => {
                    console.log(res.data)
                    setPost(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },[])
    // Function to initiate transaction with Phantom wallet
    const lendWithPhantom = async () => {
        if (!window.solana) {
            alert('Phantom extension not found. Please install Phantom to use this feature.');
            return;
        }

        try {
            // Connect to Phantom
            await window.solana.connect();

            // Get connection to Solana network
            const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

            // Get recent blockhash
            const recentBlockhash = await connection.getRecentBlockhash();

            // Construct transaction
            const pubKey = localStorage.getItem("pubKey") || ""
            const senderPublicKey = new PublicKey(pubKey);
            const receiverPublicKey = new PublicKey("2dU1GhDQLEy2rst4KjAdYgkc8RqsXH5hRoD8cUv4DSE9");
            const feePayerPublicKey = new PublicKey(pubKey); // Specify fee payer's public key
            // const amount = 1000000; // Amount to transfer in lamports (e.g., 1 SOL = 1,000,000 lamports)

            // Create transaction
            const transaction = new Transaction({
                recentBlockhash: recentBlockhash.blockhash,
                feePayer: feePayerPublicKey, // Set the fee payer
            }).add(
                SystemProgram.transfer({
                    fromPubkey: senderPublicKey,
                    toPubkey: receiverPublicKey,
                    lamports: pay,
                })
            );

            // Sign and send transaction
            await window.solana.signAndSendTransaction(transaction);

            // Transaction successful
            console.log('Transaction successful');
        } catch (error) {
            console.error('Error sending transaction: ', error);
        }
    };
    const toggleOptions = () => {
        setShowOptions(!showOptions);
        setUserStoryClicked(prevState => !prevState);
    };

    return (
        <div className="flex flex-col items-start justify-around p-8">
            <div onClick={()=>router.push("/")} className="flex gap-2 text-lg mb-6 cursor-pointer ">
                <span><MoveLeft /></span>
                <span>Users Story</span>
            </div>
            <p className="text-lg text-[#4F46E5] mb-8">{post?.name}'s Application</p>
            <div className="grid grid-cols-2 gap-8 mb-4">
                <div className="col-span-1">
                    {post?.imageUploaded && <Image src={`https://funds4good.pranavbisaria.live${post?.imageUploaded}`} alt="post Image" width={1200} height={800}/>}
                    </div>
                <div className="col-span-1">
                    <p className="mb-4">Pay(in lamports) :</p>
                    <div className="mb-4">
                        <input
                            onChange={(e)=>setPay(parseInt(e.target.value))}
                            type="number"
                            placeholder="Enter amount"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="text-center bg-[#4F46E5] text-white px-6 py-3 w-1/2 h-12 rounded-md mb-4" onClick={lendWithPhantom}>Lend</button>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <p className='font-semibold text-lg'>bio</p>
                    <p>{post?.bio}</p>
                </div>
                <div>
                    <p className='font-semibold text-lg'>Id Type</p>
                    <p>{post?.idDetails}</p>
                </div>
                <div>
                    <p className='font-semibold text-lg'>Id Number</p>
                    <p>{post?.idNumber}</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PostDescription;
