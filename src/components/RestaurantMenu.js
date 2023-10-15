import React, { useState } from 'react'
import Loading from './Loading'
import { useParams } from 'react-router-dom'
import useRestaurantMenu from '../utils/useRestaurantMenu'
import RestaurantMenuAccordion from './RestaurantMenuAccordion'
import { PURE_VEG_IMAGE } from '../utils/constants'

const RestaurantMenu = () => {
  const {resId} = useParams();

  const [showIndex, setShowIndex] = useState(0);
  let resDetails = useRestaurantMenu(resId);

  if (resDetails === null) {
    return <Loading text={'Fetching restaurant menu for you...'}/>
  }

  const restaurantDetails = resDetails?.cards[0]?.card?.card?.info;
  let restaurantMenuCards;
  if(resDetails?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
    restaurantMenuCards = resDetails?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  }
  else if(resDetails?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
    restaurantMenuCards = resDetails?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  } else {
    restaurantMenuCards = resDetails.cards[3].groupedCard.cardGroupMap.REGULAR.cards; 
  }


  return (
    <div className='lg:mx-[20%] mt-5 min-[375px]:mx-[10%] max-[650px]:mx-[10%]'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-[#282c3f] font-bold text-xl capitalize'>{restaurantDetails.name}</h1>
            <div className='mt-2'>
              <div className='text-[#7e808c] overflow-hidden text-ellipsis flex-nowrap text-sm'>{restaurantDetails.cuisines.join(", ")}</div>
              <div className='text-[#7e808c] overflow-hidden text-ellipsis flex-nowrap text-sm'>{restaurantDetails.areaName}</div>
            </div>
          </div>
          <div className='text-center'>
            <div className='text-green-500 font-bold'>{restaurantDetails.avgRating}</div>
            <div className='font-light text-sm'>{restaurantDetails.totalRatingsString}</div>
          </div>
        </div>
        <div className='mb-2 text-[#7e808c] overflow-hidden text-ellipsis flex-nowrap text-sm'>
          <div className='mt-3 flex space-x-1'>
            <div className='font-extrabold text-black'>₹ {restaurantDetails.costForTwo / 100} for two</div>
          </div>
        </div>
        <div className="h-1 border-solid border-b-4 mt-1"></div>
        {
          restaurantDetails.veg && 
          <div className='flex'>
            <div>
              <img
                alt='Pure Veg'
                className='w-8 h-8'
                src={PURE_VEG_IMAGE}
              />
            </div>
            <div className='mt-2 text-sm'>PURE VEG</div>
          </div>
        }

        <div className='mt-5'>
        {
          restaurantMenuCards.map((card, index) => (
              <div key={index}>
                {
                  card?.card?.card?.itemCards && 
                  <RestaurantMenuAccordion 
                    key={card?.card?.card?.title} 
                    cardDetails={card?.card?.card}
                    resDetails={restaurantDetails}
                    isAccordionOpen={index === showIndex}
                    setShowIndex={() => {setShowIndex(index === showIndex ? null : index)}}
                  />
                }
            </div>
          ))
        }
        </div>
        <div>

        </div>
    </div>
  )
}

export default RestaurantMenu;