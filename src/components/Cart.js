import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, addItem, removeItem, setResDetails } from '../utils/cartSlice';
import {CDN_URL} from '../utils/constants'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);
    const resDetails = useSelector((store) => store.cart.resDetails);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    let totalPrice = 0;
    let gstCharges = 10;
    let platformFee = 3;
    let toPay = gstCharges + platformFee;
    let navigate = useNavigate();

    const orderedItems = new Map();
    cartItems.forEach((item) => {
        if(orderedItems.has(item.id)) {
            let _item = orderedItems.get(item.id);
            _item.count += 1;
        } else {
            orderedItems.set(item.id, {item: item, count: 1});
        }
        let price = (item.price ? item.price / 100 : item.defaultPrice / 100);
        totalPrice += price;
    });
    const _orderedItems = Array.from(orderedItems);
    toPay = totalPrice;

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
        dispatch(setResDetails({}));
    }

    const handleAddItem = (itemInfo) => {
        // Dispatch an action
        dispatch(addItem(itemInfo));
    }

    const handleRemoveItem = (item) => {
      dispatch(removeItem(item));
    }

    const handleItemCount = (item, type) => {
      if(type === 'add') {
        handleAddItem(item)
      } else {
        handleRemoveItem(item);
      }
    }

    const placeOrder = () => {
        setIsOrderPlaced(true);
        handleClearCart();
    }

    return (
        <div className='lg:mx-[13%]'>
            {
                cartItems.length > 0 &&
                <div className='m-5'>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div className='mr-2'>
                                <img 
                                    alt={resDetails.name}
                                    className='h-14 w-14'
                                    src={CDN_URL + resDetails.cloudinaryImageId}
                                />
                            </div>
                            <div>
                                <div className='font-bold cursor-pointer hover:text-orange-500 hover:underline' onClick={() => {navigate('/restaurant/' + resDetails.id)}}>{resDetails.name}</div>
                                <div>{resDetails.areaName}</div>
                            </div>
                        </div>
                        <div 
                            className='p-1 h-10 border border-slate-300 text-green-500 font-bold cursor-pointer max-[450px]:w-1/2'
                            onClick={handleClearCart}
                        >
                            Clear cart
                        </div>
                    </div>
                    <div className='h-80 m-1 p-2  overflow-y-auto overflow-x-hidden'>
                        {
                            _orderedItems.map((item) => (
                                <div key={item[0]} className='w-full flex p-2 m-5 bg-gray-200'>
                                    <div className='flex w-4/12'>
                                        <img 
                                            src={item[1].item?.itemAttribute?.vegClassifier === 'VEG' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png' : 'https://m.media-amazon.com/images/I/31KiTfpLyFL.jpg'}
                                            alt='veg'
                                            className='w-4 h-4 mt-3'
                                        />
                                        <div className='m-2 text-sm'>{item[1].item.name}</div>
                                    </div>
                                    <div className='flex justify-between border h-10 w-20 border-slate-300 p-1 text-green-500'>
                                        <button onClick={() => handleItemCount(item[1].item, 'remove')} className="text-lg mb-1">-</button>
                                        <div className="flex-1 text-center mt-1">{item[1].count}</div>
                                        <button onClick={() => handleItemCount(item[1].item, 'add')} className="text-lg mb-1">+</button> 
                                    </div>
                                    <div className='w-4/12 float-right m-2 ml-10'>&#8377;{(item[1].item.price ? item[1].item.price / 100 : item[1].item.defaultPrice / 100) * item[1].count}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='m-3'>
                        <div className='font-bold'>Bill Details</div>
                        <div className='flex justify-between w-1/2 font-light'>
                            <div className='text-sm ml-1'>Item Total</div>
                            <div>&#8377;{totalPrice}</div>
                        </div>
                        <div className='flex justify-between w-1/2 font-light'>
                            <div className='text-sm ml-1'>Platform Fee</div>
                            <div>&#8377;{platformFee}</div>
                        </div>
                        <div className='flex justify-between w-1/2 font-light'>
                            <div className='text-sm ml-1'>GST and Restaurant Charges</div>
                            <div>&#8377;{gstCharges}</div>
                        </div>
                        <div className="h-0.5 border border-black bg-gray-900 mt-2"></div>
                        <div className='flex justify-between w-1/2'>
                            <div className='ml-1 mt-1 font-bold'>TO PAY</div>
                            <div>&#8377;{toPay}</div>
                        </div>
                    </div>
                    <div>
                        <button 
                            id="colorButton"
                            onClick={placeOrder}
                            className="text-center m-auto block font-bold border p-3 bg-orange-500 text-white"
                            >
                            Place Order
                        </button>
                    </div>
                </div> 
            }
            {
                cartItems.length === 0 && !isOrderPlaced && 
                <div>
                    <div className='flex flex-col justify-center items-center h-screen'>
                        <img
                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                            alt='Your cart is empty'
                            className='w-72 h-64'
                        />
                        <div className='mt-10 text-gray-400'>Your cart is empty</div>
                        <div className='ml-10 justify-center text-gray-400'>You can go to the home page to view more restaurants</div>
                    </div> 
                </div>
            }
            {
                cartItems.length === 0 && isOrderPlaced && 
                <div className='text-center m-auto'>
                    <img
                        src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnE3MWZobzgxbjhoMm90bTloaXhibGxiOGhkYTUwbHN5aTRtZGptaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cmCHuk53AiTmOwBXlw/giphy.gif'
                        alt='Swiggy delivery boy'
                        className='items-center m-auto'
                        width={200}
                        height={200}
                    />
                    <div className='font-bold'>
                        Thank you for ordering. <br/>
                        Your order will reach you in approximately 30 mins
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart;