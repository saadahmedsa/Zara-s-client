"use client"

import { ChartNoAxesCombined,BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

import { useRouter } from 'next/navigation'
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';

const Sidebar = ({open , setopen}) => {
  const router = useRouter()
  


  return (
    <>
    <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <Menu setOpen={setopen} />
          </div>
        </SheetContent>
      </Sheet>
    <aside className='hidden w-64 flex-col border-r-2 bg-background p-6 lg:flex'>
      <div onClick={()=>router.push("/Admin/dashboard")} className='flex cursor-pointer items-center gap-3'>
        <ChartNoAxesCombined size={30}/>
        <h1 className='text-xl font-extrabold'>Admin Panel</h1>

      </div>
      <Menu/>

    </aside>
    </>
  )
}

export default Sidebar

function Menu({setOpen}){
  const router = useRouter()

  return <nav  className='flex-col mt-8 flex gap-2'>
    {
      adminmenu.map(item=><div 
        onClick={()=> 
          {router.push(item.path);
            setOpen ? setOpen(false) : null;
      }}
         key={item.id} className='flex items-center gap-2 rounded-md p-2
      text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer'>

       {item.icon}
       <span>{item.label}</span>
      </div>)
    }

  </nav>
}
 const adminmenu = [
  {
    id:"dashboard",
    label:"Dashboard",
    path:"/Admin/dashboard",
    icon : <LayoutDashboard/>
  },
  {
    id:"order",
    label:"Order",
    path:"/Admin/order",
    icon : <ShoppingBasket/>
  },
  {
    id:"products",
    label:"Products",
    path:"/Admin/products",
    icon : <BadgeCheck/>
  },
]