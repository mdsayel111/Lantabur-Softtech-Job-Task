"use client";
import React from "react";
import AuthForm from "../shared/auth_form/AuthForm";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const handleSubmit: React.ReactEventHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form as HTMLFormElement);
    // get user email and password
    const email = data.get("email");
    const password = data.get("password");
    try {
      const { data } = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("token", data.token);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <AuthForm handleSubmit={handleSubmit} text="Sign In" />
    </div>
  );
};

export default SignIn;
