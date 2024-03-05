"use client";

import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar/sidebar";
import { Loader } from "@/components/ui/loader";
import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const loginId = searchParams.get("LoginId");
  const { data } = useLoginGoogle(loginId);

  if (data) {
    window.location.href = "/";
  }

  let isAuthenticated: boolean;

  if (typeof localStorage !== "undefined") {
    isAuthenticated = !!localStorage.getItem("token");
  } else {
    isAuthenticated = false;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Sidebar />
      <div className={`duration-300 flex-1 flex-col space-y-5 md:ml-[280px]`}>
        <Header />
        {loginId ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <main className="flex-1 md:mx-5 pb-10">{children}</main>
        )}
      </div>
    </div>
  );
}
