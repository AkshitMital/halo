import CreditCard from "@/components/icons/Billing";
import Home from "@/components/icons/Home";
import FileDuoToneBlack from "@/components/icons/Library";
import Bell from "@/components/icons/Notifications";
import Settings from "@/components/icons/Settings";
import React from "react";

export const MENU_ITEMS = (
  workSpacedId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: "Home", href: `/dashboard/${workSpacedId}/home`, icon: <Home /> },
  {
    title: "My Library",
    href: `/dashboard/${workSpacedId}`,
    icon: <FileDuoToneBlack />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workSpacedId}/notifications`,
    icon: <Bell />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workSpacedId}/billing`,
    icon: <CreditCard />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workSpacedId}/settings`,
    icon: <Settings />,
  },
];
