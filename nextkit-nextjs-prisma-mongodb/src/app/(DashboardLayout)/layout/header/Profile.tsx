"use client";

import { Icon } from "@iconify/react";
import { Button, Dropdown, Spinner } from "flowbite-react";
import React, { useState, useEffect } from "react";
import * as profileData from "./Data";
import Link from "next/link";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/utils/cookie";
import { clientFetch } from "@/lib/clientFetch";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  async function handleLogout() {
    setIsLoading(true);
    try {
      // 调用后端登出 API（如果有）
      try {
        const response = await clientFetch("/api/user/logout", {
          method: "POST",
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(
          error,
          "Logout API call failed, but continuing with local cleanup"
        );
      }

      // 清除本地存储
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      // 清除 Cookie（用于 middleware 路由保护）
      deleteCookie("accessToken");

      // 跳转到登录页
      window.location.href = "/auth/login";
    } catch (error) {
      console.log(error, "Logout failed!");
      // 即使出错也清除本地数据
      localStorage.clear();
      deleteCookie("accessToken");
      window.location.href = "/auth/login";
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="group/menu ps-15 relative shrink-0">
      <Dropdown
        label=""
        className="w-screen rounded-sm pb-6 pt-4 sm:w-[200px]"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="hover:text-primary hover:bg-lightprimary group-hover/menu:bg-lightprimary group-hover/menu:text-primary flex cursor-pointer items-center justify-center rounded-full">
            {userInfo?.image ? (
              <Image
                src="/images/profile/user-1.jpg"
                alt="logo"
                height="35"
                width="35"
                className="rounded-full"
              />
            ) : (
              <span className="bg-lightprimary text-primary border-primary flex size-[35px] items-center justify-center rounded-full border text-lg font-medium">
                {userInfo?.name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        )}
      >
        <SimpleBar>
          {profileData.profileDD.map((items, index) => (
            <Dropdown.Item
              as={Link}
              href={items.url}
              className="bg-hover group/link flex w-full items-center justify-between px-4 py-2"
              key={index}
            >
              <div className="w-full">
                <div className="flex w-full items-center gap-3 ps-0">
                  <Icon
                    icon={items.icon}
                    className="text-bodytext dark:text-darklink group-hover/link:text-primary text-lg"
                  />
                  <div className="w-3/4 ">
                    <h5 className="text-bodytext dark:text-darklink group-hover/link:text-primary mb-0 text-sm">
                      {items.title}
                    </h5>
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </SimpleBar>

        <div className="px-4 pt-2">
          <Button
            color={"outlineprimary"}
            size={"md"}
            className="flex w-full items-center gap-2 rounded-md py-0 disabled:hover:bg-none"
            onClick={handleLogout}
          >
            {isLoading ? (
              <Spinner aria-label="Info spinner example" size="sm" />
            ) : null}
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
