"use client"

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import classNames from "classnames";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useState } from "react";

export default function Appply() {
    const [currentStep, setCurrentStep] = useState<Number>(1)
    function stepClasses(step: Number) {
        return classNames(
            {
                "bg-[#4F46E5]": currentStep >= step,
                "bg-[#D9D9D9]": currentStep < step,
                "text-white": currentStep >= step,
            },
        );
    }
    function lineClasses(step: Number) {
        return classNames(
            {
                "border-[#4F46E5]": currentStep >= step,
            },
        );
    }
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2"><Navbar page="Apply" /></div>
            <div className="col-span-10 p-8">
                <p className="text-[#4F46E5] text-3xl">Application</p>
                <div className="my-4 flex gap-2 items-center">
                    <div className={`${stepClasses(1)} p-2 w-12 h-12 text-center text-lg rounded-full cursor-pointer border-white border-2`}>1</div>
                    <div className={`w-1/4 border-2 border-gray-200 h-0 ${lineClasses(2)} `} />
                    <div className={`${stepClasses(2)} p-2 w-12 h-12 text-center text-lg rounded-full cursor-pointer border-white border-2`}>2</div>
                    <div className={`w-1/4 border-2 border-gray-200 h-0 ${lineClasses(3)} `} />
                    <div className={`${stepClasses(3)} p-2 w-12 h-12 text-center text-lg rounded-full cursor-pointer border-white border-2`}>3</div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="font-semibold">Personal Details</p>
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-black/60">Full Name</p>
                            <input className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2" />
                        </div>
                        <div>
                            <p className="text-black/60">Zip Code</p>
                            <input className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2" />
                        </div>
                    </div>
                    <div>
                        <p className="text-black/60">Bio</p>
                        <textarea className="rounded-md border-2 border-[#D9D9D9] w-1/2 h-[25vh] resize-none p-2" />
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-black/60">Annual Income (per annum)</p>
                            <input className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2" />
                        </div>
                        <div>
                            <p className="text-black/60">Occupation</p>
                            <input className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2" />
                        </div>
                    </div>
                    <div>
                        <p className="text-black/60">ID Details</p>
                        <input className="rounded-md border-2 border-[#D9D9D9] w-1/4 p-2" />
                    </div>
                    <div>
                        <p className="text-black/60 mb-4">Upload Supporting Document</p>
                        <Button className="rounded-md bg-[#4F46E5] w-1/4 p-2 text-white" > <ArrowUp /> Upload </Button>
                    </div>
                    <div className="w-full pr-12">
                        <Button className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right" > Next <ArrowRight /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
