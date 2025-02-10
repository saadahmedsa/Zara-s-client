"use client"
import Image from 'next/image'
import React from 'react'
import accImg from "../../../../public/account.jpg";
import Address from "../../../components/view/Address"
import { useSelector } from 'react-redux';
import Cartitemcard from '../../../components/view/cartitem';
import { Button } from '../../../components/ui/button';

const page = () => {
  const {cartItems} = useSelector(state => state.cartItems)
  const itemsArray = cartItems?.items || [];
  const amount = itemsArray.length > 0 
      ? itemsArray.reduce((sum, item) => 
          sum + ((item?.salePrice > 0 ? item?.salePrice : item?.price) * (item?.quantity || 1)), 0)
      : 0;
  
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
       <Address/>
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
          <Button className="w-full">Checkout with Paypal</Button>
        </div>
      </div>
      </div>
     
    </div>
  )
}

export default page