"use client"

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import BaseUrl from "@/lib/BaseUrl";
import classNames from "classnames";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Define the type for form data
type FormData = {
    name: string;
    zipcode: string;
    bio: string;
    income: string;
    occupation: string;
    idNumber: string;
    loanAmount: string;
    loanCategory: string;
    loanDuration: string;
    loanDurationUnit: string;
    repaymentStartDate: string;
    emiRepetition: string;
    loanPurpose: string;
    idDetails: string
}

export default function Apply() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const router = useRouter()
    // State object to hold values of all fields
    const defaultFormData = {
        name: "",
        zipcode: "",
        bio: "",
        income: "",
        occupation: "",
        idNumber: "",
        loanAmount: "",
        loanCategory: "",
        loanDuration: "",
        loanDurationUnit: "",
        repaymentStartDate: "",
        emiRepetition: "",
        loanPurpose: "",
        idDetails: "Adhaar"
    }
    const [formData, setFormData] = useState<FormData>(defaultFormData);

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

    function renderValue(name: keyof FormData) {
        return formData[name];
    }

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

    function handleSubmit() {
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

        
        const formDataJson = JSON.stringify(formData);
        
        const object = new FormData();
        object.append("loanRequest", formDataJson);
        
        if (selectedImage !== null) {
            object.append("image", selectedImage);
        }
        
        BaseUrl.post("api/loans/apply", object, config)
        .then((res) => {
            console.log(res)
            if(res.status==200){
                toast.success("applied successfully")
                setFormData(defaultFormData)
                setCurrentStep(1)
            }
        })
        .catch((err) => {
                console.log(err)
            })
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
                                    name="name"
                                    value={renderValue("name")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-black/60">Zip Code</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="zipcode"
                                    type="number"
                                    value={renderValue("zipcode")}
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
                                maxLength={500}
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-black/60">Annual Income (per annum)</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="income"
                                    value={renderValue("income")}
                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </div>
                            <div>
                                <p className="text-black/60">Occupation</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                    name="occupation"
                                    value={renderValue("occupation")}
                                    onChange={handleInputChange}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="w-full">
                                <p className="text-black/60">ID Details</p>
                                <input
                                    className="rounded-md border-2 border-[#D9D9D9] w-1/4 p-2"
                                    name="idNumber"
                                    value={renderValue("idNumber")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-black/60">ID Category</p>
                                <select
                                    className="rounded-md border-2 border-[#D9D9D9] p-2 ml-2"
                                    name="idDetails"
                                    onChange={handleSelectChange}
                                >
                                    <option>Adhaar</option>
                                    <option>PAN</option>
                                    <option>Passport</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p className="text-black/60 mb-4">Upload Supporting Document</p>
                            <div className="relative flex items-center">
                                <input onChange={handleImageChange} id="file-upload" type="file" className="z-10 absolute opacity-0 cursor-pointer" accept=".jpg, .jpeg, .png" />
                                <button className="rounded-md bg-[#4F46E5] w-1/5 p-2 text-white cursor-pointer flex justify-center items-center" >
                                    <ArrowUp /><p>Upload</p>
                                </button>
                            </div>
                            {selectedImage && <Image width={400} height={400} src={URL.createObjectURL(selectedImage)} alt="document" />}
                        </div>
                        {(selectedImage && formData.name && formData.bio && formData.idDetails && formData.idNumber && formData.zipcode && formData.occupation) && <div className="w-full pr-12">
                            <Button onClick={() => handleNextStep(2)} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right">
                                Next <ArrowRight />
                            </Button>
                        </div>}
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
                                    value={renderValue("loanAmount")}
                                    name="loanAmount"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-black/60">Loan Category</p>
                                <select
                                    className="rounded-md border-2 border-[#D9D9D9] p-2 ml-2"
                                    name="loanCategory"
                                    onChange={handleSelectChange}
                                >
                                    <option>StartUp</option>
                                    <option>Women and Children</option>
                                    <option>Medical Expenses</option>
                                    <option>Potential Borrowers</option>
                                </select>
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
                            {(formData.loanAmount && formData.loanCategory && formData.loanDuration && formData.loanPurpose && formData.repaymentStartDate && formData.emiRepetition) &&
                                <Button onClick={() => handleNextStep(3)} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right">
                                    Next <ArrowRight />
                                </Button>}
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
                                        value={renderValue("name")}
                                    />
                                </div>
                                <div>
                                    <p className="text-black/60">Zip Code</p>
                                    <input
                                        disabled
                                        className="rounded-md border-2 border-[#D9D9D9] w-1/2 p-2"
                                        value={renderValue("zipcode")}
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
                                        value={renderValue("income")}
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
                                    value={renderValue("idNumber")}
                                />
                            </div>
                            <div>
                                <p className="text-black/60 mb-4">Supporting Document</p>
                                {selectedImage && <Image width={400} height={400} src={URL.createObjectURL(selectedImage)} alt="document" />}
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
                                    <select
                                        className="rounded-md border-2 border-[#D9D9D9] p-2 ml-2"
                                        name="loanCategory"
                                        onChange={handleSelectChange}
                                    >
                                        <option>StartUp</option>
                                        <option>Women and Children</option>
                                        <option>Medical Expenses</option>
                                        <option>Potential Borrowers</option>
                                    </select>
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
                            <Button onClick={handleSubmit} className="rounded-xl bg-[#4F46E5] w-1/6 p-2 text-white float-right">
                                Submit <ArrowRight />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}