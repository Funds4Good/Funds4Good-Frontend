"use client"

import React, { useState } from 'react';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import postImg from '../../public/post.svg';
import { Transaction, SystemProgram, PublicKey, Connection } from '@solana/web3.js';

const PostDescription = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [userStoryClicked, setUserStoryClicked] = useState(false);
    const [progress, setProgress] = useState(50);

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
            const senderPublicKey = new PublicKey('6YiQzkm8ZWzdBuKYKuVukdXDRTfe2vT9tf2UBrhCWL8D');
            const receiverPublicKey = new PublicKey('2dU1GhDQLEy2rst4KjAdYgkc8RqsXH5hRoD8cUv4DSE9');
            const feePayerPublicKey = new PublicKey('6YiQzkm8ZWzdBuKYKuVukdXDRTfe2vT9tf2UBrhCWL8D'); // Specify fee payer's public key
            // const amount = 1000000; // Amount to transfer in lamports (e.g., 1 SOL = 1,000,000 lamports)
    
            // Create transaction
            const transaction = new Transaction({
                recentBlockhash: recentBlockhash.blockhash,
                feePayer: feePayerPublicKey, // Set the fee payer
            }).add(
                SystemProgram.transfer({
                    fromPubkey: senderPublicKey,
                    toPubkey: receiverPublicKey,
                    lamports: 10000,
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
                    <button className="text-center bg-[#4F46E5] text-white px-6 py-3 w-1/2 h-12 rounded-md mb-4" onClick={lendWithPhantom}>Lend</button>
                </div>
            </div>
            {/* Rest of your component */}
        </div>
    );
};

export default PostDescription;
