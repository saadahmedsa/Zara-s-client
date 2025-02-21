"use client"

import { loginFormControls } from '../../../config/index'
import { loginuser } from '../../../config/store/auth-slice';
import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useToast } from '../../../hooks/use-toast';
import CommonForm from '../../../components/view/form';
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const {toast} = useToast()

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const onSubmit = (event)=>{
    event.preventDefault()
    dispatch(loginuser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message
        })
      }else{
        toast({
          title :"Invalid email or Password",
          variant : "destructive"
        })

      }
   console.log(data);
   
    })
    
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
       
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className='text-center'>
      <p className="mt-2">
          Don't have an account
          <Link className="font-medium ml-2 text-primary hover:underline"
            href={"/auth/Register"}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login