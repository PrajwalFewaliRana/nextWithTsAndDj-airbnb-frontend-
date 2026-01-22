"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import apiService from "@/app/services/apiService";
import { error } from "console";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {
  const signupModal = useSignupModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  //submit functionality

  const submitSignup = async()=>{
    const formdata ={
      email:email,
      password1:password1,
      password2:password2
    }
    const response = await apiService.post('/api/auth/register/',JSON.stringify(formdata) )
    if (response.access){
      handleLogin(response.user.pk,response.access,response.refresh)
      signupModal.close()
      router.push('/')
    }else{
      const tempErrors:string[] = Object.values(response).map((error:any)=>{
        return error;
      })
      setErrors(tempErrors)
    }
  }
  const content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please login</h2>
      <form action={submitSignup} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your e-mail address"
          className="px-4 w-full h-13.5 border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword1(e.target.value)}
          type="password"
          placeholder="Your password"
          className="px-4 w-full h-13.5 border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="Repeat password"
          placeholder="Your password"
          className="px-4 w-full h-13.5 border-gray-300 rounded-xl"
        />
        {errors.map((error, index) => {
          return (
            <div key={`error_${index}`} className="p-5 airbnb text-white rounded-xl opacity-80 pointer-events-none">
              {error}
            </div>
          );
        })}
        <CustomButton label="Signup" onClick={submitSignup} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
