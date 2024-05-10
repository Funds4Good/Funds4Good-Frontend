import React from 'react'
import Story from './Story'

const Stories = () => {
    return (
        <nav className=" min-h-[100vh] w-full bg-white text-black flex flex-col items-start justify-around p-4 border-r-[#D9D9D9] border-2">
            <p className="text-xl mb-6">Success Stories</p>
            <Story />
            <Story />


        </nav>
    )
}

export default Stories