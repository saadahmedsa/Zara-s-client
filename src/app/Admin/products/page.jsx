
"use client"
import React, { Fragment, useEffect, useState } from 'react'
import ImageUpload from "../../../components/admin-view/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../../components/ui/sheet'
import CommonForm from '../../../components/view/form'
import { Addproduct } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, getallproduct } from '../../../config/store/admin/products-slice'
import { useToast } from '../../../hooks/use-toast'
import AdminProductTile from "../../../components/admin-view/Card"
const initialstate ={
  image : "",
  title : "",
  description : "",
  category : "",
  brand : "",
  price : "",
  salePrice : "",
  totalStock : "",

}

const page = () => {

  const [open,setopen]= useState(false)
  const [formdata,setformdata]= useState(initialstate)
  const [image,setimage]= useState(null)
  const [uploaded,setuploaded]= useState(null)
  const [edit,setedit]= useState(null)
  const {productList} = useSelector(state =>  state.adminproduct)
  const dispatch = useDispatch()
  const {toast} = useToast()
  const handdelete = (id)=>{
   console.log(id);
   dispatch(deleteProduct({
    id  
  })).then((data)=>{
    if(data?.payload?.success){
      dispatch(getallproduct())   
       toast({
        title:data?.payload?.message
       })
    }else{
      toast({
        title:data?.payload?.message,
        variant:"destructive"
       })
    }
  })
   
  }
  
  const onsubmit = (event) => {
     event.preventDefault()

     if(!edit) {
     if (!formdata.title || !formdata.description || !formdata.category || 
      !formdata.brand || !formdata.price  || 
      !formdata.totalStock || !uploaded) {
        toast({
          title:"All feild Required",
          variant:"destructive"
         })
    return;
  }}
 console.log(edit);
 
  edit !== null ?
  dispatch(editProduct({
    id:edit,
    formdata,
    
  })).then((data)=>{
    console.log(formdata)
    console.log(data);
    
    if(data?.payload?.success){
      dispatch(getallproduct())   
      setimage(null)
      setopen(false)
      setformdata(initialstate)
      setedit(null)
       toast({
        title:data?.payload?.message
       })
    }else{
      toast({
        title:data?.payload?.message,
        variant:"destructive"
       })
    }
  }):
     dispatch(addNewProduct({
      ...formdata,
     image: uploaded
     })).then((data)=>{
      if(data?.payload?.success){
        dispatch(getallproduct())
        setimage(null)
        setopen(false)
        setformdata(initialstate)
         toast({
          title:data?.payload?.message
         })
      }else{
        toast({
          title:data?.payload?.message,
          variant:"destructive"
         })

      }
       
      //  console.log(data);
    })
  }
  // console.log(productList);
  
  useEffect(()=>{
    dispatch(getallproduct())
  },[dispatch])
  return (
    <Fragment>
    <div className='mb-5 w-full flex justify-end'>
      <button className='bg-black text-white py-2 px-6 rounded-md' onClick={()=>setopen(true)}>Add Product</button>
    </div>
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {
        productList && productList.length > 0 ?
        productList.map(item => <AdminProductTile setformData={setformdata} handdelete={handdelete}  setopen={setopen} setedit={setedit} key={item._id} product={item}/>) : null
      }
    </div>
      <Sheet open={open}
       onOpenChange={
      ()=>{setopen(false)
       setedit(null)
       setformdata(initialstate)}}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{edit !== null ? "Edited Product" : "Add new Product"}</SheetTitle>
          </SheetHeader>
          <ImageUpload 
          file={image} setfile={setimage} uploaded={uploaded} setuploaded={setuploaded}
          iseditmode={edit !== null}/>
          <div className='py-6'>
            <CommonForm 
            formControls={Addproduct} formData={formdata} setFormData={setformdata} onSubmit={onsubmit} buttonText={edit !== null ? "Edit Product" : "Add  Product"}/>
          </div>

        </SheetContent>
      </Sheet>

    </Fragment>
  )
}

export default page