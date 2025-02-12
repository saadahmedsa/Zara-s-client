"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import accImg from "../../../../public/account.jpg";
import Address from "../../../components/view/Address"
import { useDispatch, useSelector } from 'react-redux';
import Cartitemcard from '../../../components/view/cartitem';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../hooks/use-toast';
import { createNewOrder } from '../../../config/store/shop/order-slice';
import { getcartitems } from '../../../config/store/shop/cart-slice';

const page = () => {
  const {cartItems} = useSelector(state => state.cartItems)
  const {toast} = useToast()
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const [address,setaddress] = useState(null)
  const itemsArray = cartItems?.items || [];
  const amount = itemsArray.length > 0 
      ? itemsArray.reduce((sum, item) => 
          sum + ((item?.salePrice > 0 ? item?.salePrice : item?.price) * (item?.quantity || 1)), 0)
      : 0;
      function handleInitiatePaypalPayment() {
        if (cartItems.length === 0) {
          toast({
            title: "Your cart is empty. Please add items to proceed",
            variant: "destructive",
          });
    
          return;
        }
        if (address === null) {
          toast({
            title: "Please select one address to proceed.",
            variant: "destructive",
          });
    
          return;
        }
    
        const orderData = {
          userId: user?.id,
          cartId: cartItems?._id,
          cartItems: cartItems.items.map((singleCartItem) => ({
            productId: singleCartItem?.productId,
            title: singleCartItem?.title,
            image: singleCartItem?.image,
            price:
              singleCartItem?.salePrice > 0
                ? singleCartItem?.salePrice
                : singleCartItem?.price,
            quantity: singleCartItem?.quantity,
          })),
          addressInfo: {
            addressId: address?._id,
            address: address?.address,
            city: address?.city,
            pincode: address?.pincode,
            phone: address?.phone,
            notes: address?.notes,
          },
          orderStatus: "pending",
          paymentMethod: "Cash",
          paymentStatus: "COD",
          totalAmount: amount,
          orderDate: new Date(),
          orderUpdateDate: new Date(),
          paymentId: "",
          payerId: "",
        };
    
        dispatch(createNewOrder(orderData)).then((data) => {
          if (data?.payload?.success) {
          toast({
            title:"Order added Successfully"
          })
          dispatch(getcartitems(user?.id))
          }
        });
      
      }
    
  
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
      <Image
          src={accImg}
          alt="accimag"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2  gap-5 mt-5 p-5'>
      <Address setaddress={setaddress} selectedId={address}/>
       <div className='flex flex-col gap-3'>
      {
        cartItems && cartItems?.items && cartItems?.items?.length > 0 ? cartItems?.items.map(item => <Cartitemcard item={item} key={item.productId}/>) : <p className="text-center">No Cart Items</p>
      }
           <div className="mt-6 space-y-6">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${amount}</span>
          </div>
        </div>
        <div className='mt-4 w-full'>
          <Button onClick={handleInitiatePaypalPayment} className="w-full">Checkout cart</Button>
        </div>
      </div>
      </div>
     
    </div>
  )
}

export default page