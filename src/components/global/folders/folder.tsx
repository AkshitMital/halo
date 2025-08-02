"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import FolderDuoToneBlack from "@/components/icons/FolderDuoToneBlack";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ id, name, optimistic, count }: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);

  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, name),
    "workspace-folders",
    Renamed
  );

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathName}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current && folderCardRef.current) {
      if (
        !inputRef.current.contains(e.target as Node | null) &&
        !folderCardRef.current.contains(e.target as Node | null)
      ) {
        if (inputRef.current.value) {
          mutate({ name: inputRef.current.value });
        } else {
          Renamed();
        }
      }
    }
  };

  return (
    <div
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer rounded-lg transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 border-[1px]"
      )}
      onClick={handleFolderClick}
      ref={folderCardRef}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                updateFolderName(e)
              }
              autoFocus
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation}
              onDoubleClick={handleNameDoubleClick}
              className="text-neutral-300"
            >
              {name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderDuoToneBlack />
    </div>
  );
};

export default Folder;
