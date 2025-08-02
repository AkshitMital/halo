"use client";

import { getWorkSpaces } from "@/actions/workspace";
import React from "react";
import Modal from "../modal";
import { useQueryData } from "@/hooks/useQueryData";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon } from "lucide-react";
import WorkspaceForm from "@/components/forms/workspace-form";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);

  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

  if (plan.subscription?.plan === "FREE") {
    return <></>;
  }
  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces help you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself"
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 p-5 rounded-2xl">
            <FolderPlusIcon />
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};

export default CreateWorkspace;
