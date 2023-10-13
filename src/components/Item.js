import React, { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, removeItem, setResDetails } from "../utils/cartSlice";
import Modal from './Modal';

const Item = ({item, isCart, resDetails}) => {

    const dispatch = useDispatch();
    const [selectedCount, setSelectedCount] = useState(0);
    const [isResSame, setIsResSame] = useState(true);
    const [itemToAdd, setItemToAdd] = useState({});

    const storeResDetails = useSelector((store) => store.cart.resDetails);
    const cartItems = useSelector((store) => store.cart.items);

    useEffect(() => {
      let itemsCount = 0;
      cartItems.forEach((cartItem) => {
          if(cartItem.id === item.id) {
            itemsCount += 1;
          }
      });
      setSelectedCount(itemsCount);
    }, [cartItems, item.id]);

    const handleAddItem = (itemInfo) => {
      debugger;
      if(Object.keys(storeResDetails).length === 0) {
        setSelectedCount(selectedCount + 1);
        dispatch(setResDetails(resDetails));
        dispatch(addItem(itemInfo));
      } else {
        if(storeResDetails?.name && storeResDetails?.name === resDetails.name) {
          setSelectedCount(selectedCount + 1);
          dispatch(addItem(itemInfo));
        } else {
          setIsResSame(false);
          setItemToAdd(itemInfo);
        }
      }
    }

    const handleRemoveItem = (item) => {
      setSelectedCount(selectedCount - 1);
      dispatch(removeItem(item));
    }

    const handleItemCount = (item, type) => {
      if(type === 'add') {
        handleAddItem(item)
      } else {
        handleRemoveItem(item);
      }
    }

    const handleClose = () => {
      setIsResSame(!isResSame);
    };


    const handleNo = () => {
      setIsResSame(!isResSame);
    }

    const handleYes = () => {
      setIsResSame(!isResSame);
      dispatch(clearCart());
      dispatch(setResDetails(resDetails));
      setSelectedCount(selectedCount + 1);
      dispatch(addItem(itemToAdd));
    }

  return (
    <React.Fragment>
      <div className="flex justify-between m-3 mb-3" key={item.id}>
        <div className="w-10/12 h-32 mr-3 mb-6">
          <div className="flex">
            {item.isBestseller && item.ribbon && (
              <div className="flex">
                <div className="five-pointed-star"></div>
                <div className="text-[#ee9c00] font-bold leading-4 text-sm">
                  Bestseller
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <img 
                src={item.isVeg ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png' : 'https://m.media-amazon.com/images/I/31KiTfpLyFL.jpg'}
                alt='veg'
                className='w-4 h-4 mt-4'
            />
            <div className="mr-1 mt-3 font-bold text-[#3e4152] break-all ml-2">
              {item.name}
            </div>
          </div>
          <div className="mr-1 mt-3 font-bold text-[#3e4152] break-all">
            &#8377;{item.price ? item.price / 100 : item.defaultPrice / 100}
          </div>
          <div className="mt-4 leading-5 break-all text-justify">
            {item.description}
          </div>
        </div>
        <div className="relative inline-block w-2/12">
          {isCart ? 
            <img
              className="h-28 rounded-md"
              alt={item.name}
              src={CDN_URL + item.imageId}
            /> :
            // <div className="relative text-center">
            //   <img
            //     className="h-28 rounded-md"
            //     alt={item.name}
            //     src={CDN_URL + item.imageId}
            //   />
            //   {selectedCount === 0 ? 
            //     <button
            //       className="bg-slate-100 text-green-500 w-1/2 border border-black shadow-md absolute top-20 left-9 p-2 rounded-sm cursor-pointer"
            //       onClick={() => handleAddItem(item)}
            //     >
            //       Add
            //     </button> :
            //     <div className="flex bg-slate-100 w-1/2 text-green-500 border border-black shadow-md absolute top-20 left-9 p-2 rounded-sm cursor-pointer justify-between">
            //       <div className="flex items-center">
            //         <button onClick={() => handleItemCount(item, 'remove')} className="text-lg">-</button>
            //       </div>
            //       <div className="flex-1 text-center">{selectedCount}</div>
            //       <div className="flex items-center">
            //         <button onClick={() => handleItemCount(item, 'add')} className="text-lg">+</button>
            //       </div>
            //     </div>                       
            //   }
            // </div>
            <div className="relative text-center">
              <div className="relative inline-block">
                <img
                  className="h-28 rounded-md"
                  alt={item.name}
                  src={CDN_URL + item.imageId}
                />
              </div>
              {selectedCount > 0 ? (
                <div className="flex bg-slate-100 w-1/2 text-green-500 border border-black shadow-md absolute top-20 left-9 p-1.5 rounded-sm cursor-pointer justify-between">
                  <div className="flex items-center">
                    <button onClick={() => handleItemCount(item, 'remove')} className="text-lg">-</button>
                  </div>
                  <div className="flex-1 text-center">{selectedCount}</div>
                  <div className="flex items-center">
                    <button onClick={() => handleItemCount(item, 'add')} className="text-lg">+</button>
                  </div>
                </div>
              ): (
                <button
                className="items-center bg-slate-100 w-1/2 text-green-500 border border-black shadow-md absolute top-20 left-9 p-2 rounded-sm cursor-pointer justify-between"
                  // className="bg-slate-100 text-green-500 border border-black shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-sm cursor-pointer"
                  onClick={() => handleAddItem(item)}
                >
                  Add
                </button>
              )}
            </div>
          }
        </div>
      </div>
      <div className="h-1 border-solid border-b-2 mb-3"></div>
      {
        !isResSame && 
        <Modal 
          isOpen={!isResSame} 
          handleClose={handleClose}
          modalDetails={{
            header: "Items already in cart", 
            body: "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?",
            footer: {
              no: {message: 'NO', handler: handleNo},
              yes: {message: 'YES, START AFRESH', handler: handleYes},
            }
          }}
        />
      }
    </React.Fragment>
  );
};

export default Item;
