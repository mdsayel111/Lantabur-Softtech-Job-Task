"use client";
import * as React from "react";
import AuthForm from "../shared/auth_form/AuthForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleSubmit: React.ReactEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const data = new FormData(form as HTMLFormElement);
    // get user email and password
    const email = data?.get("email");
    const password = data?.get("password");
    try {
      const { data } = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      toast.success(data.message);
      setLoading(false);
      router.push("/signin");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return <AuthForm loading={loading} handleSubmit={handleSubmit} text="Sign Up" />;
}
