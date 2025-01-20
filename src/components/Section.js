import React, { useEffect, useRef, useState } from 'react'
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import RestaurantCard, {withOfferText} from './RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurants } from '../utils/restaurantsSlice';
import { UPDATE_RESTAURANTS_LIST_URL } from '../utils/constants';
import Shimmer from './Shimmer';

const Section = ({card}) => {
    const RestaurantCardWithOffer = withOfferText(RestaurantCard);
    const [isLoading, setIsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [isHandlePureVeg, setIsHandlePureVeg] = useState(false);
    const [isHandleRating, setIsHandleRating] = useState(false);

    const containerRef = useRef(null);
    const scrollDivRef = useRef(null);

    const prev = () => {
        containerRef.current.scrollLeft -= 500; 
    };

    const next = () => {
        containerRef.current.scrollLeft += 500;
    };

    const allRestaurants = useSelector((store) => store.restaurants.restaurants);

    if(card[0] === 'restaurants_list') {
        localStorage.setItem('resCount', allRestaurants.length + 1);
    }

    useEffect(() => {
        if(card[0] === 'restaurants_list') {
            setRestaurants(allRestaurants);
            setFilteredRestaurants(allRestaurants);
        } else if (card[0] === 'top_brands_for_you') {
            setRestaurants(card[1].data.gridElements.infoWithStyle.restaurants);
            setFilteredRestaurants(card[1].data.gridElements.infoWithStyle.restaurants);
        }
    }, [card, allRestaurants]);


    const handlePureVeg = () => {
        if(!isHandlePureVeg) {
            let _filteredRestaurants = [];
            filteredRestaurants.forEach((restaurant) => {
                if(restaurant.info.veg) {
                    _filteredRestaurants.push(restaurant);
                }
            });
            setFilteredRestaurants(_filteredRestaurants);
        } else {
            setFilteredRestaurants(restaurants);
        }
        setIsHandlePureVeg(!isHandlePureVeg);
    }

    const handleRating = () => {
        if(!isHandleRating) {
            let _filteredRestaurants = [];
            filteredRestaurants.forEach((restaurant) => {
                if(restaurant.info.avgRating > 4.0) {
                    _filteredRestaurants.push(restaurant);
                }
            });
            setFilteredRestaurants(_filteredRestaurants);
        } else {
            setFilteredRestaurants(restaurants);
        }
        setIsHandleRating(!isHandleRating);
    }

    let dispatch = useDispatch();

    useEffect(() => {
        if(card[0] === 'restaurants_list') {
            let isFetchCalled = false;
            let res = card[1].data?.gridElements?.infoWithStyle?.restaurants;
            dispatch(updateRestaurants({cardDetails: res, isUpdate: false}));
            
            const fetchRes = async () => {
                setIsLoading(true);
                let count = JSON.parse(localStorage.getItem('resCount')) ? JSON.parse(localStorage.getItem('resCount')) : 10;
                let latLng = JSON.parse(localStorage.getItem('latLng'));
                let latitude = latLng?.lat ? latLng.lat : 17.385044;
                let longitude = latLng?.lng ? latLng.lng : 78.486671
                const data = await fetch(UPDATE_RESTAURANTS_LIST_URL + "?lat=" + latitude + "&lng=" + longitude + '&apiV2=true', {
                    method: "POST", 
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            "sortAttribute": "relevance",
                            "isFiltered": false,
                            "queryId": "seo-data-6c1dc200-b5c9-4c80-a200-6a6f8446f4f3",
                            "seoParams": {
                                "apiName": "CityPage",
                                "brandId": "",
                                "seoUrl": "www.swiggy.com/order-online-near-me",
                                "pageType": "NEAR_ME_PAGE",
                                "businessLine": "FOOD"
                            },
                            "widgetOffset": {
                                "NewListingView_category_bar_chicletranking_TwoRows": "",
                                "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
                                "Restaurant_Group_WebView_PB_Theme": "",
                                "Restaurant_Group_WebView_SEO_PB_Theme": "",
                                "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": JSON.stringify(count),
                                "inlineFacetFilter": "",
                                "restaurantCountWidget": ""
                            },
                            "nextOffset": "CJY7ELQ4KID4lZTW1Zn6djDUEA=="
                        }), 
                });
                const json = await data.json();
                let restaurantsData = json?.data?.success?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                localStorage.setItem('resCount', JSON.stringify(restaurantsData.length))
                dispatch(updateRestaurants({cardDetails: restaurantsData, isUpdate: true}));
                isFetchCalled = false;
                setIsLoading(false);
            };

            const handleScroll = () => {
                if (scrollDivRef.current) {
                  const rect = scrollDivRef.current.getBoundingClientRect();
                  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          
                  if (isVisible && !isFetchCalled) {
                    // debugger;
                    fetchRes();
                    isFetchCalled = true;
                  }
                }
            };
          
            window.addEventListener('scroll', handleScroll);
        
            return () => {
            window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [card, dispatch])

    let title = '';
    if(card[0] === 'offers' || card[0] === 'whats_on_mind') {
        let style = {};
        let imageUrl = '';
        let data = card[1].data.gridElements.infoWithStyle.info;
        if(card[0] === 'offers') {
            style = {'width': 425, 'height': 252};
            imageUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/';
            title = 'Best offers for you'
            return (
                <Carousel 
                    style={style} 
                    imageUrl={imageUrl} 
                    data={data}
                    title={title}
                />
            )
        } 
        else if (card[0] === 'whats_on_mind'){
            style = {'width': 144, 'height': 180};
            imageUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';
            title = card[1].data.header.title;
            return (
                <Carousel 
                    style={style} 
                    imageUrl={imageUrl} 
                    data={data}
                    title={title}
                />
            )
        }
    } else if(card[0] === 'restaurants_list' || card[0] === 'top_brands_for_you') {
        return (
            <div className='sm:m-[5%] min-[375px]:m-[5%] max-[412px]:m-[5%]'>
                <div className='flex justify-between mt-5'>
                    <div className='font-bold text-2xl'>{card[1].data.title ? card[1].data.title : card[1].data.header.title}</div>
                    {card[0] === 'top_brands_for_you' && <div className='flex space-x-2'>
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
                    </div>}
                </div>
                <div className='mt-4 ml-4'>
                    {
                        card[0] === 'restaurants_list' && 
                        <div className='flex justify-between'>
                            <div>
                                <ul className='flex'>
                                    <li 
                                        className='p-2 border border-slate-300 rounded-3xl w-36 text-center mr-2 cursor-pointer hover:bg-slate-200'
                                        onClick={handleRating}
                                    >
                                        <div className='flex'>
                                            <div className='mr-3'>Ratings 4.0+</div>
                                            <div><div>{isHandleRating && <img alt='close' src='https://static.thenounproject.com/png/1202535-200.png' className='w-6 h-6'/>}</div></div>
                                        </div>
                                    </li>
                                    <li 
                                        className='p-2 border border-slate-300 rounded-3xl w-28 text-center mr-2 cursor-pointer hover:bg-slate-200'
                                        onClick={handlePureVeg}
                                    >
                                        <div className='flex'>
                                            <div className='mr-1'>Pure Veg</div>
                                            <div><div>{isHandlePureVeg && <img alt='close' src='https://static.thenounproject.com/png/1202535-200.png' className='w-6 h-6'/>}</div></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                <div  ref={containerRef} className= {card[0] === 'top_brands_for_you' ? 'flex mt-4 space-x-5 overflow-x-scroll no-scrollbar' : 'flex flex-wrap mt-4'}>
                    {
                        filteredRestaurants.map((restaurant) => (
                            <Link key={restaurant.info.id} to={"restaurant/" + restaurant.info.id}>
                                {
                                    restaurant.info.aggregatedDiscountInfoV3 ?
                                    <RestaurantCardWithOffer resData={restaurant}/> :
                                    <RestaurantCard resData={restaurant} shouldEnableCarousel={card[0] === 'top_brands_for_you' ? true : false}/>
                                }
                            </Link>
                        ))
                    }
                </div>
                <div>
                    {
                        card[0] === 'restaurants_list' && <div ref={scrollDivRef}></div>
                    }
                </div>
                {isLoading && 
                    <div className='flex flex-wrap'>
                        <Shimmer/>
                        <Shimmer/>
                        <Shimmer/>
                        <Shimmer/>
                    </div>
                }
            </div>
        )
    } else if (card[0] === 'otherDetails') {
        let otherDetails = card[1].data;
        return (
            <div>
              {otherDetails.map((details, index) => (
                <div key={index}>
                  <div className='font-bold text-2xl'>{details.title}</div>
                  <div className='grid grid-cols-4 gap-4 mt-4 text-center'>
                    {details.brands.map((brand, index) => (
                      <div className='border p-4 truncate cursor-pointer' key={index}><a href={brand.link} target='_blank' rel="noreferrer">{brand.text}</a></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
    }
}

export default Section;