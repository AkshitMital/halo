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
import { useQueryData } from "@/hooks/useQueryData";
import { WorkspaceProps } from "@/types/index.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Search from "../search";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);

  const { data: workSpace } = data as WorkspaceProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkSpace = workSpace.workSpace.find(
    (s) => s.id === activeWorkSpaceId
  );

  return (
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
        <ul>ferwfe</ul>
      </nav>
    </div>
  );
};

export default Sidebar;
