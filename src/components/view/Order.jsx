"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import Orderdetail from '../view/Orderdetail'

const Order = () => {
  const [open,setopen]=useState(false)
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
            <TableRow>
              <TableCell>1234</TableCell>
              <TableCell>1234</TableCell>
              <TableCell>1234</TableCell>
              <TableCell>1234</TableCell>
              <TableCell>
                <Dialog open={open} onOpenChange={setopen}>
                <Button onClick={()=>setopen(true)}>View Details</Button>
                <Orderdetail/>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

    </Card>
  )
}

export default Order