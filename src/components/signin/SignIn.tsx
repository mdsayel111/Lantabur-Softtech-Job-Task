"use client";
import React, { useState } from "react";
import AuthForm from "../shared/auth_form/AuthForm";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit: React.ReactEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const data = new FormData(form as HTMLFormElement);
    // get user email and password
    const email = data?.get("email");
    const password = data?.get("password");
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
      setLoading(false);
      toast.success(data.message);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <AuthForm loading={loading} handleSubmit={handleSubmit} text="Sign In" />
    </div>
  );
};

export default SignIn;
