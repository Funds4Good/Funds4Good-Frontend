import React from 'react'
import Image from 'next/image'
import storiesImg from '../../public/stories.svg'

const Story = () => {
    const storyItems = [
        {

            name: "Women Empowerment",
            img: storiesImg,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {

            name: "Women Empowerment",
            img: storiesImg,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {

            name: "Women Empowerment",
            img: storiesImg,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
    ]

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            {storyItems.map((item) =>
                <>
                    <p className=" text-lg mb-2 text-[#4F46E5]">{item.name}</p>
                    <Image src={item.img} alt="stories_images" className="mb-2 rounded-lg" />
                    <p className="text-gray-700 text-sm">{item.desc}</p></>
            )}
        </div>
    )
}

export default Story