const Section = ({card}) => {
    console.log(card.data , card.data?.title ? card.data?.title : card.data?.header?.title);

    return (
        <div>{card.data?.title ? card.data?.title : card.data?.header?.title}</div>
    )
}

export default Section;