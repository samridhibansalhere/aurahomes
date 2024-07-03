"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button, Drawer, message } from "antd";
import { GetCurrentUserFromMongoDB } from "@/actions/users";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { Home, List, User as UserIcon } from "lucide-react";

const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={18} />,
  },
  {
    name: "Properties",
    path: "/user/properties",
    icon: <List size={18} />,
  },
  {
    name: "Account",
    path: "/user/account",
    icon: <UserIcon size={18} />,
  },
  {
    name: "Subscriptions",
    path: "/user/subscriptions",
    icon: <List size={18} />,
  },
  {
    name: "Queries",
    path: "/user/queries",
    icon: <List size={18} />,
  },
];
const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={18} />,
  },
  {
    name: "Properties",
    path: "/admin/properties",
    icon: <List size={18} />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <UserIcon size={18} />,
  },
];

function Sidebar({ showSidebar, setShowSidebar, menuToShow }: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  menuToShow: any[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowSidebar(false);
    router.push('/sign-in');
  };

  return (
    <Drawer
      open={showSidebar}
      onClose={() => setShowSidebar(false)}
      closable
    >
      <div className="flex flex-col gap-4 p-4">
        {menuToShow.map((item, index) => (
          <div
            key={index}
            className={`flex gap-4 items-center text-gray-700 cursor-pointer px-4 py-2 rounded ${pathname === item.path ? "bg-primary text-white" : ""}`}
            onClick={() => {
              router.push(item.path);
              setShowSidebar(false);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
        <div className="text-center cursor-pointer text-red-500" onClick={onLogout}>
          Logout
        </div>
      </div>
    </Drawer>
  );
}

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [menuToShow, setMenuToShow] = useState<any>(userMenu);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);
  const isAdminRoute = pathname.split("/")[1] === "admin";

  const getHeader = () => {
    if (isPublicRoute) return null;
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-3 flex justify-between items-center rounded-b">
          <h1
            className="text-2xl text-white font-bold cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            AuraHomes
          </h1>

          <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
            <Button
              className="text-primary hover:text-primary"
              type="link"
              onClick={() => setDrawerVisible(true)}
            >
              {currentUserData?.username}
            </Button>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    if (isPublicRoute) return children;
    if (loading) return <Loader />;
    if (isAdminRoute && !currentUserData?.isAdmin)
      return (
        <div className="py-20 lg:px-20 px-5 text-center text-gray-600 text-sm">
          You are not authorized to view this page
        </div>
      );
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
      if (response.data.isAdmin) {
        setMenuToShow(adminMenu);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
      <Sidebar
        showSidebar={drawerVisible}
        setShowSidebar={setDrawerVisible}
        menuToShow={menuToShow}
      />
    </div>
  );
}

export default LayoutProvider;
