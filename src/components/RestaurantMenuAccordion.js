import React from "react";
import Item from "./Item";

const RestaurantMenuAccordion = ({
  cardDetails,
  isAccordionOpen,
  setShowIndex,
  resDetails
}) => {
  const details = cardDetails;
  return (
    <div>
      <div
        className="cursor-pointer flex justify-between mb-8 shadow-xl border-black"
        onClick={() => {
          setShowIndex();
        }}
      >
        <div className="text-[#3e4152] font-bold p-2">
          {details.title + "(" + details.itemCards.length + ")"}
        </div>
        <div>
          {isAccordionOpen ? (
            <img
              alt='collapse'
              className="w-5 h-5 m-3"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/OOjs_UI_icon_collapse.svg/2048px-OOjs_UI_icon_collapse.svg.png"
            />
          ) : (
            <img
            alt="expand"
              className="w-5 h-5 m-3"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVb1IcFrhPX2fOXprYZ-vX4xKjRWEa8KLLA&usqp=CAU"
            />
          )}
        </div>
      </div>

      {isAccordionOpen &&
        details.itemCards.map((itemCard) => (
          <Item key={itemCard.card.info.id} item={itemCard.card.info} isCart={false} resDetails={resDetails} />
        ))}
    </div>
  );
};

export default RestaurantMenuAccordion;
