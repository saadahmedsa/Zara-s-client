"use client";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config/index";
import Cartitemcard from "../view/cartitem";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu";
import { logoutuser } from "../../config/store/auth-slice";
import { useEffect, useState } from "react";
import { getcartitems } from "../../config/store/shop/cart-slice";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems?.length > 0 ? (
        shoppingViewHeaderMenuItems.map((menuItem) => (
          <Link href={menuItem.path} className="text-sm font-medium cursor-pointer" key={menuItem.id}>
            {menuItem.label}
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No menu items</p>
      )}
    </nav>
  );
}

function RightItems({ user }){
  const dispatch = useDispatch()
  const [open ,setopen] = useState(false)
  const {cartItems} = useSelector(state =>  state.cartItems)
  const itemsArray = cartItems?.items || [];
const amount = itemsArray.length > 0 
    ? itemsArray.reduce((sum, item) => 
        sum + ((item?.salePrice > 0 ? item?.salePrice : item?.price) * (item?.quantity || 1)), 0)
    : 0;

  useEffect(()=>{
     dispatch(getcartitems(user?.id))
  },[dispatch])
  
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
     <Sheet open={open} onOpenChange={()=>setopen(false)}>
     <Button  onClick={()=>setopen(true)}  size="icon">
        <ShoppingCart className=" w-6 h-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <SheetContent>
  <SheetHeader>
    <SheetTitle>Your Cart</SheetTitle> {/* Ensure this is always present */}
  </SheetHeader>
  <div className="mt-6 space-y-6">
    {cartItems?.items?.length > 0 ? (
      cartItems.items.map((item) => (
        <Cartitemcard item={item} key={item.productId} />
      ))
    ) : (
      <p className="text-center">No Cart Items</p>
    )}
  </div>
  <div className="mt-6 space-y-6">
    <div className="flex justify-between">
      <span className="font-bold">Total</span>
      <span className="font-bold">${amount}</span>
    </div>
  </div>
  <Button className="w-full mt-5" onClick={() => setopen(false)}>
    <Link href={"/shop/checkout"}>Checkout</Link>
  </Button>
</SheetContent>

     </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-white">
            <AvatarFallback className="bg-white text-black font-extrabold">
              {user?.username ? user.username[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username || "Guest"}</DropdownMenuLabel>
       <DropdownMenuSeparator/>
       <DropdownMenuItem >
        <Link href={"/shop/account"} className="flex gap-2">
        <UserCog className="mr-2 h-4 w-4"/>
        Account</Link>
       </DropdownMenuItem>
       <DropdownMenuSeparator/>
       <DropdownMenuItem onClick={()=>dispatch(logoutuser())}>
        <LogOut className="mr-2 h-4 w-4"/>
        logout
       </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Navbar() {
  const authState = useSelector((state) => state.auth || {});
  const { isAuthenticated, user } = authState;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-black text-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Zara's</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button  size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
        <RightItems user={user}/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
        <RightItems user={user}/>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
