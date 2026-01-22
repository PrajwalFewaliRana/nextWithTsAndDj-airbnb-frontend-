"use client";
import useLoginModel from "@/app/hooks/useLoginModel";
import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const LoginModal = () => {
  const loginModal = useLoginModel();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin=async()=>{
    const formData ={
      email:email,
      password:password,
    }
    const response = await apiService.post('/api/auth/login/',JSON.stringify(formData))
    console.log("response:", response);
    if (response.access){
      handleLogin(response.user.pk,response.access,response.refresh)
      loginModal.close();
      router.push('/')
      window.alert("login successful")
    }else{
      setErrors(response.non_field_errors)
    }
  }
  const content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please login</h2>
      <form action={submitLogin} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your e-mail address"
          className="px-4 w-full h-13.5 border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your password"
          className="px-4 w-full h-13.5 border-gray-300 rounded-xl"
        />
        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-5 airbnb text-white rounded-xl opacity-80 pointer-events-none"
            >
              {error}
            </div>
          );
        })}{" "}
            {/* <button type="submit"  className={` text-center w-full py-4 airbnb text-white rounded-xl transition cursor-pointer`}>Login</button> */}
        <CustomButton label="Login" onClick={submitLogin} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
