"use client";
import { Layout as AntLayout } from "antd";
import React, { useContext } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import { Bounce, ToastContainer } from "react-toastify";
import Content from "@/app/components/content/Content";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="page-wrapper flex w-full">
        {/* Header/sidebar */}
        <Sidebar />
        {/* <div className="body-wrapper dark:bg-dark w-full bg-white"> */}
        {/* Top Header  */}
        {/* <Header /> */}
        {/* Body Content  */}
        {/* <div
            className={`flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black`}
          >
            {children}
          </div> */}

        <div className="custom-scrollbar relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
          <AntLayout className="flex-1 bg-transparent">
            <Content>{children}</Content>
          </AntLayout>
        </div>
        {/* </div> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
