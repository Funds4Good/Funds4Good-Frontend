"use client"

import BaseUrl from "@/lib/BaseUrl";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleSubmit() {
        if (email && password && name && (password==confirmPassword)) {
            setLoading(true);
            BaseUrl.post("/api/auth/signup", {
                name: name,
                email: email,
                password: password
            })
            .then((res)=>{
                setLoading(true);
                const token = res.data.accessToken
                if(res.status == 200){
                    localStorage.setItem("accessToken" , token);
                    localStorage.setItem("name" , res.data.name);
                    router.push("/")
                }
            })
            .catch((err)=>{
                setLoading(true);
                console.log(err)
            })
        }
    }

    return (
        <div className="bg-[#F0F4F3] h-[100vh] flex items-center">
            <div className="bg-white rounded-xl w-4/5 mx-auto h-[75vh]">
                <div className="grid grid-cols-10 rounded-xl">
                    <div className="col-span-4 bg-signup bg-[#4F46E5] h-[75vh] w-full rounded-l-xl py-44 px-16 flex flex-col gap-12 text-white text-center">
                        <p className="text-3xl font-extrabold">Welcome Back!</p>
                        <p className="font-thin">To keep connected with us plase login with your personal info</p>
                        <Link href={"/signin"}>
                            <Button className="text-white w-1/2 p-4 mx-auto rounded-full border-2 border-white">Sign In</Button>
                        </Link>
                    </div>
                    <div className="col-span-6 p-24">
                        <p className="text-3xl font-extrabold text-[#4F46E5] text-center">Create Account</p>
                        <div className="flex flex-col my-8 placeholder-[#9A9A9A] gap-6">
                            <div className="flex mx-auto items-center w-full justify-center">
                                <div className="p-4 bg-[#F4F8F5] text-[#9A9A9A]"><User /></div>
                                <input onChange={(e) => setName(e.target.value)} className="p-4 bg-[#F4F8F5] outline-none w-1/2" placeholder="Name" />
                            </div>
                            <div className="flex mx-auto items-center w-full justify-center">
                                <div className="p-4 bg-[#F4F8F5] text-[#9A9A9A]"><Mail /></div>
                                <input onChange={(e) => setEmail(e.target.value)} className="p-4 bg-[#F4F8F5] outline-none w-1/2" placeholder="Email" />
                            </div>
                            <div className="flex mx-auto items-center w-full justify-center">
                                <div className="p-4 bg-[#F4F8F5] text-[#9A9A9A]"><Lock /></div>
                                <input onChange={(e) => setPassword(e.target.value)} className="p-4 bg-[#F4F8F5] outline-none w-1/2" placeholder="Password" />
                            </div>
                            <div className="flex mx-auto items-center w-full justify-center">
                                <div className="p-4 bg-[#F4F8F5] text-[#9A9A9A]"><Lock /></div>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} className="p-4 bg-[#F4F8F5] outline-none w-1/2" placeholder="Confirm Password" />
                            </div>
                            <Button onClick={handleSubmit} className="bg-[#5047E5] text-white w-1/2 p-4 mx-auto rounded-full">Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
