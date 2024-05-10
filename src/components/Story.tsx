import React from 'react'
import Image from 'next/image'
import storiesImg from '../../public/stories.svg'

const Story = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <p className=" text-lg mb-2 text-[#4F46E5]">Women Empowerment</p>
            <Image src={storiesImg} alt="stories_images" className="mb-2 rounded-lg" />
            <p className="text-gray-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    )
}

export default Story