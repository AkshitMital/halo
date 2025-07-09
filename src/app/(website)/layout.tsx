import React from "react";
import LandingPageNavbar from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="container flex flex-col py-10 px-10">
      <LandingPageNavbar />
      {children}
    </div>
  );
};

export default layout;
