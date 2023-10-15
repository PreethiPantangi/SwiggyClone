import { useEffect, useState } from "react";
import { FETCH_CARDS_URL, ADDRESS_RECOMMEND_URL } from '../utils/constants';
import { useSelector } from "react-redux";
import Loading from '../components/Loading';

const useFetchCards = () => {
    const [cards, setCards] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const location = useSelector((store) => store.location.location);

    useEffect(() => {
        const getLatLng = async () => {
            const data = await fetch(ADDRESS_RECOMMEND_URL + location.place_id);
            const json = await data.json();
            let geometry = json.data[0].geometry.location;
            localStorage.setItem('latLng', JSON.stringify(geometry));
            fetchData(geometry);
        }
    
        const fetchData = async (geometry) => {
            setIsDataFetched(false);
            const data = await fetch(FETCH_CARDS_URL + 'lat=' + geometry.lat + '&lng=' + geometry.lng);
            const json = await data.json();
            const sections = new Map();
            let title = '';
            let isFirstTime = true;
    
            /**
             * Cards
             * 0 - Can be either offers banner or What's on your mind? - We can figure this out using the header object
             * 1 - If 0 is offers then 1 is header 
             * 2 - Restaurants in the CITY_NAME
             * 3 - Sort settings 
             * 4 - Restaurants for 2
             * 5 - Show more button
             * 6 - 11 -> shows different data 
             */
    
            (json.data.cards).forEach((card) => { 
                let cardDetails = card.card.card;
                if(cardDetails.imageGridCards && cardDetails.gridElements &&  !cardDetails.header.title) {
                    cardDetails.title = 'Offers';
                    sections.set('offers', {isPresent: true, data: cardDetails});
                } else if (cardDetails.id === 'whats_on_your_mind') {
                    cardDetails.title = "What's on your mind?";
                    sections.set('whats_on_mind', {isPresent: true, data: cardDetails});
                } else if (cardDetails.id === 'top_brands_for_you') {
                    sections.set('top_brands_for_you', {isPresent: true, data: cardDetails});
                } else if (cardDetails.id === 'popular_restaurants_title') {
                    title = cardDetails.title;
                } else if (cardDetails.id === 'restaurant_grid_listing') {
                    cardDetails['title'] = title;
                    sections.set('restaurants_list', {isPresent: true, data: cardDetails});
                } else if (cardDetails.id === 'restaurant_near_me_links') {
                    if(isFirstTime) {
                        sections.set('otherDetails', {isPresent: true, data: [cardDetails]});
                        isFirstTime = false;
                    } else {
                        let details = sections.get('otherDetails');
                        details.data.push(cardDetails);
                        sections.set('otherDetails', details);
                    }
                }
            });
            setCards(sections);
            setIsDataFetched(true);
        }
        
        if(Object.keys(location).length > 0) {
            getLatLng();
        } else {
            fetchData({lat: 17.385044, lng:78.486671});
        }
    }, [location]);

    if(!isDataFetched) {
        return <Loading text={'Looking for great food near you...'}/>
    }

    return cards;
}

export default useFetchCards;