"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkSpace = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const isUserInWorkSpace = await client.workSpace.findUnique({
      where: {
        id: workSpaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return {
      status: 200,
      data: { workSpace: isUserInWorkSpace },
    };
  } catch (err) {
    return {
      status: 403,
      data: {
        workSpace: null,
      },
    };
  }
};

export const getWorkSpaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: { folders: isFolders } };
    }

    return { status: 404, data: [] };
  } catch (err) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }

    return { status: 404 };
  } catch (err) {
    return { status: 400 };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const workSpaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workSpace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workSpaces) return { status: 200, data: workSpaces };

    return { status: 404 };
  } catch (err) {
    return { status: 400 };
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workSpace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) {
        return { status: 201, data: "Workspace Created" };
      }
    }
    return {
      status: 401,
      data: "You are not authorized to create a workspace",
    };
  } catch (error) {
    return { status: 400 };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: { id: folderId },
      data: { name },
    });

    if (folder) return { status: 200, data: "Folder renamed" };

    return { status: 400, data: "Failed to rename folder" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};
