import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/verify";
import { redirect } from "next/navigation";

const Page = () => {
  const cookie: any = cookies();
  const token = cookie?.get("token")?.value;
  const isVerify = verifyToken(token);
  if (!isVerify) {
    redirect("/signin");
  }
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <h1 className="text-3xl text-primary">This is a Private route...</h1>
    </div>
  );
};

export default Page;
