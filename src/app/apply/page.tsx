"use client"

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import classNames from "classnames";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useState } from "react";

// Define the type for form data
type FormData = {
    fullName: string;
    zipCode: string;
    bio: string;
    annualIncome: string;
    occupation: string;
    idDetails: string;
    loanAmount: string;
    loanCategory: string;
    loanDuration: string;
    repaymentStartDate: string;
    emiRepetition: string;
    loanPurpose: string;
}

export default function Apply() {
    const [currentStep, setCurrentStep] = useState(1);

    // State object to hold values of all fields
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        zipCode: "",
        bio: "",
        annualIncome: "",
        occupation: "",
        idDetails: "",
        loanAmount: "",
        loanCategory: "",
        loanDuration: "",
        repaymentStartDate: "",
        emiRepetition: "",
        loanPurpose: ""
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Render value in each element
    function renderValue(name: keyof FormData) {
        return formData[name];
    }

    // Function to update the current step
    function handleNextStep(step: number) {
        setCurrentStep(step);
    }

    function stepClasses(step: number) {
        return classNames(
            {
                "bg-[#4F46E5]": currentStep >= step,
                "bg-[#D9D9D9]": currentStep < step,
                "text-white": currentStep >= step,
            },
        );
    }

    function lineClasses(step: number) {
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
                {/* Step indicators */}
                <div className="my-4 flex gap-2 items-center">
                    <div className={`${stepClasses(1)} p-2 w-12 h-12 text-center text-lg rounded-full cursor-pointer border-white border-2`}>1</div>
                    <div className={`w-1/4 border-2 border-gray-200 h-0 ${lineClasses(2)} `} />
                    <div className={`${stepClasses(2)} p-2 w-12 h-12 text-center text-lg rounded-full cursor-pointer border-white border-2`}>2</div>
                    <div className={`w-1/4 border-2 border-gray-200 h-0 ${lineClasses(3)} `} />
                    <div className={`${stepClasses(3)} p-2 w-12 h-12 text-center text-lg rounded-full cursor-pointer border-white border-2`}>3</div>
                </div>
                {/* Form sections */}
                {currentStep === 1 && (
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Personal Details</p>
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-black/60">Full Name</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="fullName"
                                    value={renderValue("fullName")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-black/60">Zip Code</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="zipCode"
                                    value={renderValue("zipCode")}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-black/60">Bio</p>
                            <textarea
                                className="rounded-md border-2 border-[#D9D9D9] w-1/2 h-[25vh] resize-none p-2"
                                name="bio"
                                value={renderValue("bio")}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-black/60">Annual Income (per annum)</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="annualIncome"
                                    value={renderValue("annualIncome")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-black/60">Occupation</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="occupation"
                                    value={renderValue("occupation")}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-black/60">ID Details</p>
                            <input
                                className="rounded-md border-2 border-[#D9D9D9] w-1/4 p-2"
                                name="idDetails"
                                value={renderValue("idDetails")}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <p className="text-black/60 mb-4">Upload Supporting Document</p>
                            <Button className="rounded-md bg-[#4F46E5] w-1/4 p-2 text-white" >
                                <ArrowUp /> Upload
                            </Button>
                        </div>
                        <div className="w-full pr-12">
                            <Button onClick={() => handleNextStep(2)} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right">
                                Next <ArrowRight />
                            </Button>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Loan Details</p>
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-black/60">Loan Amount Needed</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="loanAmount"
                                    value={renderValue("loanAmount")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-black/60">Loan Category</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="loanCategory"
                                    value={renderValue("loanCategory")}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-black-60">Duration for which you need loan</p>
                                <div className="flex w-1/2">
                                    <input
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        name="loanDuration"
                                        value={renderValue("loanDuration")}
                                        onChange={handleInputChange}
                                    />
                                    <select
                                        className="rounded-md border-2 border-[#D9D9D9] p-2 ml-2"
                                        name="loanDurationUnit"
                                        onChange={handleSelectChange}
                                    >
                                        <option>Days</option>
                                        <option>Months</option>
                                        <option>Years</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="text-black/60">Repayment starting date</p>
                                <input
                                    type="date"
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="repaymentStartDate"
                                    value={renderValue("repaymentStartDate")}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-black/60">EMI Repetition</p>
                            <select
                                className="rounded-md border-2 border-[#D9D9D9] p-2 w-1/6"
                                name="emiRepetition"
                                value={renderValue("emiRepetition")}
                                onChange={handleSelectChange}
                            >
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-black/60">Why you need this loan?</p>
                            <textarea
                                className="rounded-md border-2 border-[#D9D9D9] w-1/2 h-[25vh] resize-none p-2"
                                name="loanPurpose"
                                value={renderValue("loanPurpose")}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full pr-12">
                            <Button onClick={() => handleNextStep(1)} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white">
                                <ArrowLeft /> Back
                            </Button>
                            <Button onClick={() => handleNextStep(3)} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right">
                                Next <ArrowRight />
                            </Button>
                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className="space-y-4">
                        <p className="font-extrabold text-xl">PREVIEW</p>
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold">Personal Details</p>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-black/60">Full Name</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("fullName")}
                                    />
                                </div>
                                <div>
                                    <p className="text-black/60">Zip Code</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("zipCode")}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-black/60">Bio</p>
                                <textarea
                                    disabled
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 h-[25vh] resize-none p-2"
                                    value={renderValue("bio")}
                                />
                            </div>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-black/60">Annual Income (per annum)</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("annualIncome")}
                                    />
                                </div>
                                <div>
                                    <p className="text-black/60">Occupation</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("occupation")}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-black/60">ID Details</p>
                                <input
                                    disabled
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/4 p-2"
                                    value={renderValue("idDetails")}
                                />
                            </div>
                            <div>
                                <p className="text-black/60 mb-4">Upload Supporting Document</p>
                                <Button className="rounded-md bg-[#4F46E5] w-1/4 p-2 text-white" >
                                    <ArrowUp /> Upload
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold">Loan Details</p>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-black/60">Loan Amount Needed</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("loanAmount")}
                                    />
                                </div>
                                <div>
                                    <p className="text-black/60">Loan Category</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("loanCategory")}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-black-60">Duration for which you need loan</p>
                                    <div className="flex w-1/2">
                                        <input
                                            disabled
                                            className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                            value={renderValue("loanDuration")}
                                        />
                                        <select
                                            disabled
                                            className="rounded-md border-2 border-[#D9D9D9] p-2 ml-2"
                                            name="loanDurationUnit"
                                        >
                                            <option>Days</option>
                                            <option>Months</option>
                                            <option>Years</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-black/60">Repayment starting date</p>
                                    <input
                                        disabled
                                        type="date"
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("repaymentStartDate")}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-black/60">EMI Repetition</p>
                                <select
                                    disabled
                                    className="rounded-md border-2 border-[#D9D9D9] p-2 w-1/6"
                                    value={renderValue("emiRepetition")}
                                >
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-black/60">Why you need this loan?</p>
                                <textarea
                                    disabled
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 h-[25vh] resize-none p-2"
                                    value={renderValue("loanPurpose")}
                                />
                            </div>
                        </div>
                        <div className="w-full pr-12">
                            <Button onClick={() => handleNextStep(2)} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white">
                                <ArrowLeft /> Edit
                            </Button>
                            <Button className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right">
                                Submit <ArrowRight />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}