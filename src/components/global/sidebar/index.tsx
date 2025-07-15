"use client";

import { getWorkSpaces } from "@/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { NotificationsProps, WorkspaceProps } from "@/types/index.type";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-items";
import { getNotifications } from "@/actions/user";
import WorkSpacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import { useQueryData } from "@/hooks/useQueryData";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const menuItems = MENU_ITEMS(activeWorkSpaceId);

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );

  const { data: workSpace } = data as WorkspaceProps;
  const { data: count } = notifications as NotificationsProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkSpace = workSpace.workSpace.find(
    (s) => s.id === activeWorkSpaceId
  );

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/halo-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">HALO</p>
      </div>
      <Select
        defaultValue={activeWorkSpaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="w-full mt-16 text-neutral-400 bg-transparent">
          <SelectValue>Select a workspace</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workSpace?.workSpace?.map((workSpace) => (
              <SelectItem
                className="p-2"
                key={workSpace.id}
                value={workSpace.id}
              >
                {workSpace.name}
              </SelectItem>
            ))}
            {workSpace.members.length > 0 &&
              workSpace.members.map(
                (workSpace) =>
                  workSpace.Workspace && (
                    <SelectItem
                      value={workSpace.Workspace.id}
                      key={workSpace.Workspace.id}
                    >
                      {workSpace.Workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkSpace?.type === "PUBLIC" &&
        workSpace.subscription?.plan === "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite to Workspace
                </span>
              </span>
            }
            title="Invite to Workspace"
            description="Invite other users to your workspace"
          >
            <Search worksSpaceId={activeWorkSpaceId} />
          </Modal>
        )}
      <p className="w-full text-[#909090] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notifications) ||
                0
              }
            ></SidebarItem>
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>
      {workSpace.workSpace.length === 1 && workSpace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3C3C3C] font-medium text-sm">
            {workSpace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No Workspaces"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workSpace.workSpace.length > 0 &&
            workSpace.workSpace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkSpacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkSpacePlaceholder>
                    }
                  />
                )
            )}
          {workSpace.members.length > 0 &&
            workSpace.members.map((item) => (
              <SidebarItem
                href={`/dashboard/${item.Workspace.id}`}
                selected={pathName === `/dashboard/${item.Workspace.id}`}
                title={item.Workspace.name}
                notifications={0}
                key={item.Workspace.name}
                icon={
                  <WorkSpacePlaceholder>
                    {item.Workspace.name.charAt(0)}
                  </WorkSpacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workSpace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to PRO"
          description="Unlock AI features like transcription, AI summary and more"
          footer={
            <Button className="text-sm w-full">
              <Loader color="#000" state={false}>
                Upgrade
              </Loader>
            </Button>
          }
        />
      )}
    </div>
  );

  return (
    <div className="full">
      <InfoBar />
      {/* Sheet Mobile and Desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
