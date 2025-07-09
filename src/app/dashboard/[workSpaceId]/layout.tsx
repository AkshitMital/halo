import { getNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkSpaceFolders,
  getWorkSpaces,
  verifyAccessToWorkSpace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";

type Props = {
  params: { workSpaceId: string };
  children: React.ReactNode;
};

const Layout = async (props: Props) => {
  const {params, children} = props;
  const awaitedParams = await params;
  const workSpaceId = awaitedParams.workSpaceId;
  const auth = await onAuthenticateUser();

  if (!auth.user?.workSpace) redirect("/auth/sign-in");
  if (!auth.user.workSpace.length) redirect("/auth/sign-in");
  const hasAccess = await verifyAccessToWorkSpace(workSpaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }

  if (!hasAccess.data?.workSpace) {
    return null;
  }

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkSpaceFolders(workSpaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workSpaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkSpaceId={workSpaceId} />
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
