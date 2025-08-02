import FolderDuoToneBlack from "@/components/icons/FolderDuoToneBlack";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";
import Folder from "./folder";

type Props = {
  workSpaceId: string;
};

const Folders = ({ workSpaceId }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuoToneBlack />
          <h2 className="text-[#BDBDBD]">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-[#BDBDBD]">See all</h2>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section className={cn("flex items-center gap-4 overflow-x-auto w-full")}>
        <Folder name="Folder 1" />
      </section>
    </div>
  );
};

export default Folders;
