"use client"
import React from 'react'
import { Button } from '../../components/ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutuser } from '../../config/store/auth-slice'

const Header = ({setopen}) => {
  const dispatch = useDispatch()
  return (
    <header className='flex items-center bg-background justify-between px-4 py-3'>
      <Button  className="lg:hidden sm:block"
       onClick={() => setopen(true)}
       >
        <AlignJustify/>
        <span className='sr-only'>Menu</span>
      </Button>
      <div className='flex flex-1 justify-between ml-2'>
      <h1 className='text-xl font-extrabold'>Zara's Collection</h1>

       <Button onClick={()=>dispatch(logoutuser())} className="inline-flex gap-2 items-center rounded-md px-4 py-2 font-medium text-sm shadow">
        <LogOut/>
        logout
       </Button>
      </div>

    </header>
  )
}

export default Header