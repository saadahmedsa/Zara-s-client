import Navbar from '../../components/view/Navbar'
import Footer from '../../components/view/footer'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
        <Navbar/>
     
     <main className='flex flex-col w-full'>

        {children}
     </main>
        <Footer/>
    </div>
  )
}

export default layout