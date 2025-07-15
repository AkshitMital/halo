import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import React from "react";

type Props = {};

const WorkspaceForm = (props: Props) => {
  useCreateWorkspace();
  return <div>WorkspaceForm</div>;
};

export default WorkspaceForm;
