"use client"
import React, { useState } from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
 

const Orderdetail = ({Orderdetail}) => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div>
         <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
       <DialogTitle>
       <div className="grid gap-2 pb-2 border-b-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{Orderdetail?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{Orderdetail?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${Orderdetail?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{Orderdetail?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{Orderdetail?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  Orderdetail?.orderStatus === "delivered"
                    ? "bg-green-500"
                    : Orderdetail?.orderStatus === "rejected"
                    ? "bg-red-600" :
                     "bg-black"
                }`}
              >
                {Orderdetail?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
       </DialogTitle>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {Orderdetail?.cartItems && Orderdetail?.cartItems.length > 0
                ? Orderdetail?.cartItems.map((item) => (
                  <li key={item._id} className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                    ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.username}</span>
              <span>{Orderdetail?.addressInfo?.address}</span>
              <span>{Orderdetail?.addressInfo?.city}</span>
              <span>{Orderdetail?.addressInfo?.pincode}</span>
              <span>{Orderdetail?.addressInfo?.phone}</span>
              <span>{Orderdetail?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

      </div>
    </DialogContent>
    </div>
  )
}

export default Orderdetail