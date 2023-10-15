import React, { useRef } from 'react';

const Carousel = ({ style, imageUrl, data, title }) => {
  const { width, height } = style;

  const containerRef = useRef(null);

  const prev = () => {
    containerRef.current.scrollLeft -= 500; 
  };

  const next = () => {
    containerRef.current.scrollLeft += 500; 
  };

  return (
    <div className="sm:m-[5%] min-[375px]:m-[5%] max-[450px]:m-[5%]">
      <div className='flex justify-between items-center mt-5'>
        <div className="font-bold text-2xl">{title}</div>
        <div className='flex space-x-2'>
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={prev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={next}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll no-scrollbar mt-4" ref={containerRef}>
        <div className='flex space-x-4'>
          {
            data.map((offer) => (
              <a href={offer.action.link} key={offer.id} target='_blank' rel="noreferrer">
                <div style={{width: width, height: height}}>
                  <img
                    className='cursor-pointer'
                    src={imageUrl + offer.imageId}
                    alt={offer.id}
                    width={width} // Use width from style prop
                    height={height} // Use height from style prop
                  />
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Carousel;