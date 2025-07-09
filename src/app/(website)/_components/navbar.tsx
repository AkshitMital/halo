import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const LandingPageNavbar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-8 h-8" />
        <Image alt="logo" src="/halo-logo.svg" width={40} height={40} />
        HALO
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/"
          className="bg-[#818cf8] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#818cf8]/80"
        >
          Home
        </Link>
        <Link href="/" className="">
          Pricing
        </Link>
        <Link href="/" className="">
          Contact
        </Link>
      </div>
      <Link href="/auth/sign-in">
        <Button className="text-base flex gap-x-2">
            <User/>
            Login
        </Button>
      </Link>
    </div>
  );
};

export default LandingPageNavbar;
