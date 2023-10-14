import Loading from './Loading';
import Section from './Section';
import useFetchCards from '../utils/useFetchCards';

const Body = () => {

    const cards = Array.from(useFetchCards());

    return cards && cards.length === 0 ? 
        <Loading text={'Looking for great food near you...'}/> : 
        (
            <div className="lg:mx-[13%] mt-8">
                {
                    cards.map((card, index) => (<Section key={index} card={card}/>))
                }
            </div>
        )
}

export default Body;