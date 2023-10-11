import useFetchCards from '../utils/useFetchCards';
import Loading from './Loading';
import Section from './Section';

const Body = () => {

    const cards = useFetchCards();
    let cardsArray = Array.from(cards);

    return cardsArray && cardsArray.length === 0 ? 
        <Loading text={'Looking for great food near you...'}/> : 
        (
            <div className="lg:mx-[15%] border mt-8">
                {
                    
                    cardsArray.map((card, index) => (<Section key={index} card={card[1]}/>))
                }
            </div>
        )
}

export default Body;