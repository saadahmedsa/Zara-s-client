"use client";

import CommonForm from '../../../components/view/form';
import { registerFormControls } from '../../../config/index';
import { registerUser } from '../../../config/store/auth-slice';
import { useToast } from '../../../hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const {toast} = useToast();
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        router.push("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive", // Corrected variant
        });
      }
      console.log(data);
    }).catch((error)=>{
      toast({
        title: error,
        variant: "destructive", // Corrected variant
      });

    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            href={"/auth/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
