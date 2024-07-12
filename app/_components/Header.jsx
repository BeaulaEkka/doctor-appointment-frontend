"use client";
import React from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Header() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact",
      path: "/contact",
    },
    {
      id: 4,
      name: "Home",
      path: "/",
    },
  ];

  const { user } = useKindeBrowserClient();

  return (
    <div className="py-4 shadow-sm ">
      <div className="w-[70%]  mx-auto justify-between flex">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4 ">
          <ul className="md:flex gap-4 items-center hidden font-semibold ">
            {Menu.map((item, index) => (
              <Link href={item.path} key={index}>
                {" "}
                <li className="hover:text-primary cursor-pointer hover:scale-105">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Image
                  src={user?.picture}
                  alt="profile-image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <ul className="flex flex-col gap-2 cursor-pointer ">
                  <li className="hover:bg-slate-100 p-2 rounded-sm">Profile</li>
                  <li className="hover:bg-slate-100 p-2 rounded-sm">
                    <Link href={"/mybooking"}>My Booking</Link>
                  </li>
                  <li className="hover:bg-slate-100 p-2 rounded-sm">
                    <LogoutLink>Log out</LogoutLink>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <LoginLink>
              <Button variant="default">Sign In</Button>
            </LoginLink>
          )}

          <RegisterLink>Sign up</RegisterLink>
        </div>
      </div>
    </div>
  );
}
