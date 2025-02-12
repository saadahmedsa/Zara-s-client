"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import Orderdetail from '../view/Orderdetail'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '../../config/store/shop/order-slice'
import { Badge } from '../ui/badge'

const Order = () => {
  const dispatch = useDispatch()
  const [open,setopen]=useState(false)
  const { orderList,orderDetails } = useSelector(state => state.shopOrder)
  const { user } = useSelector(state => state.auth)
  console.log(orderDetails);
useEffect(()=>{
  dispatch(getAllOrdersByUserId(user?.id))

},[dispatch])
useEffect(() => {
  if (orderDetails !== null) setopen(true);
}, [orderDetails]);

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead><span className='sr-only'>Details</span></TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
              {orderList && orderList.length ? orderList.map((item)=>(
                <TableRow key={item?._id}>  
                <TableCell>{item?._id}</TableCell>
                <TableCell>{item?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge  className={`py-1 px-3 ${
                          item?.orderStatus === "delivered"
                            ? "bg-green-500"
                            : item?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-blue-800"
                        }`}>
                    {item?.orderStatus}
                    </Badge>
                    </TableCell>
                <TableCell>{item?.totalAmount}</TableCell>
              <TableCell>
                <Dialog open={open} onOpenChange={() =>{ setopen(false)
                  dispatch(resetOrderDetails())}}>
                <Button onClick={()=>{setopen(true)
                  dispatch(getOrderDetails(item?._id))
                  }}>View Details</Button>
                <Orderdetail Orderdetail={orderDetails}/>
                </Dialog>
              </TableCell>
            </TableRow>
              )) : null}
          </TableBody>
        </Table>
      </CardContent>

    </Card>
  )
}

export default Order