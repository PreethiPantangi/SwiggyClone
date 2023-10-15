import React from 'react'

const Loading = ({text}) => {
    return (
        <div className='my-20'>
            <div className='flex justify-center font-bold p-40 bg-[#282c3f] text-white font-sans'>{text}</div>
        </div>
    )
}

export default Loading;