import { useEffect, useState } from "react";
import {AUTOCOMPLETE_URL} from '../utils/constants';
import { useDispatch } from "react-redux";
import { updateLocation } from '../utils/locationSlice';
import { useNavigate } from "react-router-dom";

const LocationPopup = ({setShowLocationPopUp}) => {

    const [location, setLocation] = useState('');
    const [possibleLocations, setPossibleLocations] = useState([]);
    const [loadingLocations, setLoadingLocation] = useState(false);
    let navigate = useNavigate();

    const dispatch = useDispatch();
    
    const selectedLocation = (location) => {
        dispatch(updateLocation(location));
        setShowLocationPopUp();
        navigate('/');
    };

    useEffect(() => {
        const fetchLocations = async () => {
            setLoadingLocation(true);
            const data = await fetch(AUTOCOMPLETE_URL + '?input=' + location);
            const json = await data.json();
            let allPossibleLocation = [];
            (json.data).forEach((data) => {
                let res = {};
                res['place_id'] = data.place_id;
                res['place'] = data.terms[0].value;
                res['description'] = data.description;
                data.terms.splice(0,1);
                let address = '';
                data.terms.forEach((term, index) => {
                    address += term.value;
                    if(index + 1 < data.terms.length) {
                        address += ', ';
                    }
                })
                res['address'] = address;
                allPossibleLocation.push(res)
            });
            setPossibleLocations(allPossibleLocation);
            setLoadingLocation(false);
        };

        const timer = setTimeout(() => {
            if(location) {
                fetchLocations();
            } else {
                setPossibleLocations([]);
            }
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <div className="bg-white border border-black w-1/3 h-screen fixed top-0 left-0 z-50 max-[375px]:w-full max-[375px]:border-black">
            <div className="m-10">
                <div onClick={() => {setShowLocationPopUp()}}>
                    <img alt='close' src='https://static.thenounproject.com/png/1202535-200.png' className='w-6 h-6'/>
                </div>
                <div className="mt-10 border border-slate-300 rounded-sm shadow-md">
                    <input 
                        className="p-4 w-full" 
                        placeholder="Search for area, street name..."
                        value={location}
                        onChange={(e) => {setLocation(e.target.value)}}
                    />
                </div>
                <div className="mt-5 ml-5">
                    {
                        loadingLocations ? <div>Fetching Locations...</div> : 
                        possibleLocations && possibleLocations.map((location) => 
                            <div key={location.place_id} className="m-2 cursor-pointer" onClick={() => {selectedLocation(location)}}>
                                <div className="flex">
                                    <div>
                                        <img 
                                            src='https://cdn2.iconfinder.com/data/icons/cv-curriculum-vitae/100/set-cv2-15-512.png'
                                            alt="location"
                                            width={20}
                                            height={20}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <div className="font-bold text-md hover:text-orange-500">{location.place}</div>
                                        <div className="text-sm text-gray-600">{location.address}</div>
                                    </div>
                                </div>
                                <div className="h-0.5 border border-gray-200 bg-gray-200 mt-3 mb-3"></div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default LocationPopup;