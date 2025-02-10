
"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus,  Trash } from 'lucide-react'
import { deletecartitems, editcartitems } from '../../config/store/shop/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../hooks/use-toast'

const Cartitemcard = ({item}) => {
    const {toast} = useToast()
    const {user} = useSelector(state =>  state.auth)
    const dispatch = useDispatch()

    function handleUpdateQuantity(getCartItem, typeOfAction) {
        if (typeOfAction == "plus") {
          let getCartItems = item.items || [];
    
          if (getCartItems.length) {
            const indexOfCurrentCartItem = getCartItems.findIndex(
              (item) => item.productId === getCartItem?.productId
            );
    
            const getCurrentProductIndex = productList.findIndex(
              (product) => product._id === getCartItem?.productId
            );
            const getTotalStock = productList[getCurrentProductIndex].totalStock;
    
            console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");
    
            if (indexOfCurrentCartItem > -1) {
              const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
              if (getQuantity + 1 > getTotalStock) {
                toast({
                  title: `Only ${getQuantity} quantity can be added for this item`,
                  variant: "destructive",
                });
    
                return;
              }
            }
          }
        }
    
        dispatch(
          editcartitems({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity:
              typeOfAction === "plus"
                ? getCartItem?.quantity + 1
                : getCartItem?.quantity - 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: "Cart item is updated successfully",
            });
          }
        });
      }
  function deletecart(productId) {
      dispatch(deletecartitems({userId:user?.id ,productId})).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is deleted successfully",
          });
        }})  
  }

  return (
    <div className='flex items-center  space-x-4'>
      <img src={item?.image} alt={item?.title} 
      className='object-cover rounded h-20 w-20'/>
      <div className="flex-1 ">
        <h3 className='font-semibold'>{item?.title}</h3>
        <div className='flex items-center gap-2'>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8" 
               onClick={() => handleUpdateQuantity(item, "minus")}
               disabled={item?.quantity === 1}>
              <Minus className='w-4 h-4'/>
              <span className='sr-only'>Decrease</span>
            </Button>
            <span className='text-lg font-semibold'>{item?.quantity}</span>
            <Button variant="outline" size="icon"  className="rounded-full h-8 w-8"
               onClick={() => handleUpdateQuantity(item, "plus")}>
              <Plus className='w-4 h-4'/>
              <span className='sr-only'>Increase</span>
            </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
      <p className="font-semibold">
          $
          {(
            (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity).toFixed(2)}
        </p>
        <Trash onClick={()=>deletecart(item.productId)} className='cursor-pointer mt-1 ' size={20}/>
      </div>

    </div>
  )
}

export default Cartitemcard