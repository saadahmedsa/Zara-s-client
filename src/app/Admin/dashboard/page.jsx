"use client"
import React, { useEffect, useState } from 'react'
import ImageUpload from "../../../components/admin-view/image"
import { Button } from '../../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Addfeature, deletefeature, getfeature } from '../../../config/store/common-slice'
import { useToast } from '../../../hooks/use-toast'
import { title } from 'process'
import Image from 'next/image'


const page = () => {
    const [image,setimage]= useState(null)
    const {toast} = useToast()
    const [uploaded,setuploaded]= useState(null)
    const dispatch = useDispatch()
    const {featurelist} = useSelector(state => state.commonSlice)
    function submit() {
      dispatch(Addfeature({image:uploaded}))
      .then(data => {if(data?.payload?.success){
         setimage(null)
         setuploaded(null)
         dispatch(getfeature())
         toast({
          title :"image upload successfully"
         })

      }}
      )
    }
    function hadledelete(id){
      
      dispatch(deletefeature(id))
      .then(data => {
        if(data?.payload?.success){
         dispatch(getfeature())
         toast({
          title :"image delete successfully"
         })

      }})
    }
    useEffect(()=>{
     dispatch(getfeature())
    },[dispatch])
    
  return (
    <div >
       <ImageUpload 
          file={image} setfile={setimage} uploaded={uploaded} setuploaded={setuploaded}
         istrue={true}/>
         <Button onClick={submit} className="mt-4 w-full">Upload</Button>
      <div className='flex flex-col gap-4 mt-5'>
        {
          featurelist && featurelist.length > 0 ? 
          featurelist.map(item => <div key={item._id} className='relative'>
            <img src={item.image} alt="Feaured Image" 
            className='w-full h-[300px] rounded-lg object-cover'/>
            <Button className=" mt-2 w-full"onClick={()=>hadledelete(item._id)} >Delete</Button>
          </div>) : null
        }
      </div>
    </div>
  )
}

export default page