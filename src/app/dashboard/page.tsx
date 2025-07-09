import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const DashBoardPage = async () => {
  //Authentication
  const auth = await onAuthenticateUser();

  console.log(auth);

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }

  //if account exists ? we will react redirect to /onboarding : we will create an account in the database;

  return <div>page</div>;
};

export default DashBoardPage;
