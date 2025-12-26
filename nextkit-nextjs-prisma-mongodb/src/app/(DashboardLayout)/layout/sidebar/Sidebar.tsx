"use client";

import {
  Sparkles,
  TrendingUp,
  Bookmark,
  Dna,
  Settings,
  LogOut,
  User,
  Bell,
  UserPlus,
} from "lucide-react";
import { Popconfirm, message } from "antd";
// import { authService } from "@/services/auth";
// import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
// import { notificationService } from "@/services/notification";
// import { useStore } from "@/store";
// import { authStorage } from "@/utils/storage/authStorage";
import { clientFetch } from "@/lib/clientFetch";

interface UserInfo {
  id?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  [key: string]: any;
}

interface SidebarProps {
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
  isMobile?: boolean;
}

const Sidebar = ({ isMobile }: SidebarProps) => {
  // const { UserStore } = useStore();
  const [messageApi, contextHolder] = message.useMessage();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [avatarError, setAvatarError] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const pathname = usePathname();
  // const navigate = useNavigate();
  const getActiveMenuFromPath = (pathname: string): string => {
    const path = pathname.replace(/^\//, "").toLowerCase();
    const pathToMenuMap: Record<string, string> = {
      titleai: "titleAi",
      "title-ai": "titleAi",
      trendwall: "trendWall",
      "trend-wall": "trendWall",
      mycollection: "myCollection",
      "my-collection": "myCollection",
      collection: "myCollection",
      mydna: "myDna",
      "my-dna": "myDna",
      dna: "myDna",
      settings: "settings",
      notifications: "notifications",
      invite: "invite",
    };
    if (pathToMenuMap[path]) return pathToMenuMap[path];
    for (const [key, value] of Object.entries(pathToMenuMap)) {
      if (path.startsWith(key) || path.includes(key)) return value;
    }
    return "titleAi";
  };

  const activeMenu = getActiveMenuFromPath(pathname);

  const onMenuChange = (menu: string) => {
    const menuToPathMap: Record<string, string> = {
      titleAi: "/titleAi",
      trendWall: "/trendWall",
      myCollection: "/myCollection",
      myDna: "/myDna",
      settings: "/settings",
      notifications: "/notifications",
      invite: "/invite",
    };
    // navigate(menuToPathMap[menu] || `/${menu}`);
  };

  // const fetchUnreadCount = async () => {
  //   try {
  //     const resp = await notificationService.getUnreadCount();
  //     setUnreadCount(resp.unread_total || 0);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const fetchUserInfo = async () => {
    try {
      // 从 localStorage 读取用户信息
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const userInfo = JSON.parse(stored);
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // useEffect(() => {
  //   fetchUnreadCount();
  // }, [location.pathname]);

  // useEffect(() => setAvatarError(false), [userInfo?.avatar]);

  const menuItems = [
    { id: "titleAi", label: "Title AI", icon: Sparkles },
    { id: "trendWall", label: "Trend Wall", icon: TrendingUp },
    { id: "myCollection", label: "My Collection", icon: Bookmark },
    { id: "myDna", label: "My DNA", icon: Dna },
  ];

  const handleLogout = async () => {
    try {
      await clientFetch("/api/user/logout", {
        method: "POST",
      });
      messageApi.success("Logged out successfully");
      setTimeout(() => (window.location.href = "/home"), 1000);
    } catch (e) {
      messageApi.error("Logout failed");
    }
  };

  const handleSettings = () => onMenuChange("settings");

  return (
    <>
      {contextHolder}
      <div
        className={`${
          isMobile ? "h-full w-full" : "h-screen w-64 border-r"
        } flex flex-col border-cyan-500/20 bg-slate-950 text-white`}
      >
        <div className="border-b border-cyan-500/20 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-bold text-slate-100 text-transparent">
              Title Lab
            </h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onMenuChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                      : "border border-transparent text-slate-300 hover:border-cyan-500/20 hover:bg-slate-800/50 hover:text-cyan-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="space-y-3 border-t border-cyan-500/20 p-4">
          <div className="flex items-center gap-3 px-2 py-2">
            {userInfo?.avatar && !avatarError ? (
              <img
                src={userInfo.avatar}
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover shadow-lg shadow-cyan-500/30"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
                <User className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-slate-100">
                {userInfo?.nickname || userInfo?.username || "User"}
              </p>
              <p className="truncate text-xs text-cyan-400">
                {userInfo?.level_name || "Member"}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => onMenuChange("notifications")}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                activeMenu === "notifications"
                  ? "border-transparent bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "border-transparent text-slate-300 hover:border-cyan-500/20 hover:bg-slate-800/50 hover:text-cyan-300"
              }`}
            >
              <div className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                )}
              </div>
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onMenuChange("invite")}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                activeMenu === "invite"
                  ? "border-transparent bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "border-transparent text-slate-300 hover:border-cyan-500/20 hover:bg-slate-800/50 hover:text-cyan-300"
              }`}
            >
              <UserPlus className="h-5 w-5" />
              <span>Invite</span>
            </button>

            <button
              onClick={handleSettings}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                activeMenu === "settings"
                  ? "border-transparent bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "border-transparent text-slate-300 hover:border-cyan-500/20 hover:bg-slate-800/50 hover:text-cyan-300"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <Popconfirm
              title="Are you sure you want to logout?"
              description="This will end your current session."
              onConfirm={handleLogout}
              okText="Yes, logout"
              cancelText="Cancel"
              placement="topRight"
            >
              <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-4 py-3 text-slate-300 transition-colors hover:border-red-500/30 hover:bg-red-600/80 hover:text-white">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
