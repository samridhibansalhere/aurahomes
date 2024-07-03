"use server";
import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    // check if user is already exists with clerk userid property
    const clerkUser = await currentUser();
    let mongoUser = null;
    mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser?.id,
      },
    });
    if (mongoUser) {
      return {
        data: mongoUser,
      };
    }

    // if user doesn't exists, create new user
    let username = clerkUser?.username;
    if (!username) {
      username = clerkUser?.firstName + " " + clerkUser?.lastName;
    }

    username = username.replace("null", "");
    const newUser: any = {
      clerkUserId: clerkUser?.id,
      username,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePic: clerkUser?.imageUrl,
    };
    const result = await prisma.user.create({
      data: newUser,
    });
    return {
      data: result,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const UpdateUserRole = async (userId: string, isAdmin: boolean) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    await prisma.user.update({
      where: { id: userId },
      data: { isAdmin },
    });
    revalidatePath("/admin/users");
    return { success: true, message: "User role updated successfully" };
  } catch (error: any) {
    return { success: false, message: "Error while updating user role", error: error.message };
  }
};

export const ApproveUser = async (userId: string, currentStatus: boolean) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { approved: !currentStatus },
    });
    revalidatePath("/admin/users");
    return { success: true, message: `User ${!currentStatus ? "approved" : "unapproved"} successfully` };
  } catch (error: any) {
    return { success: false, message: `Error while ${!currentStatus ? "approving" : "unapproving"} user`, error: error.message };
  }
}
