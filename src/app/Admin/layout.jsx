"use client"

import Header from "../../components/admin-view/header";
import Sidebar from "../../components/admin-view/sidebar";
import { useState } from "react";


 function Adminlayout({ children }) {
  const [openmeun, setopenmenu] = useState(false)
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar open={openmeun} setopen={setopenmenu}/>
      
      <div className="flex flex-1 flex-col">
       <Header setopen={setopenmenu}/>

        <main className=" flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
        {children}
        </main>

      </div>
     
    </div>
  );
}
export default Adminlayout