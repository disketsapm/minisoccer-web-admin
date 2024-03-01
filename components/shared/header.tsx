"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/auth/useLogout";

const Header = () => {
  const [dataUser, setDataUser] = useState({} as any);
  const { mutateAsync: logout } = useLogout();

  useEffect(() => {
    // Only try to access localStorage when in the client-side environment
    if (typeof window !== "undefined") {
      try {
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user) {
          setDataUser(user);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        // Handle the error appropriately, e.g., redirect to login or show a message
      }
    }
  }, []);

  return (
    <header className="w-full border-b border-gray-300 flex justify-end py-3 px-5">
      <div className="flex gap-x-5">
        <Link
          href="/login"
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setDataUser("");
              if (dataUser?.token) {
                logout({ token: dataUser?.token });
              }
            }
          }}
        >
          {dataUser.email ? (
            <Avatar>
              <AvatarImage
                src={
                  dataUser.photo ??
                  `https://drive.google.com/file/d/1em-PVgw9RWYunZvZHdNrBUnRLu6Hl3lY/view?usp=sharing`
                }
              />
              <AvatarFallback>{dataUser.email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <Button className="px-6 py-2 text-xs md:px-10 md:py-6">Logout</Button>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
