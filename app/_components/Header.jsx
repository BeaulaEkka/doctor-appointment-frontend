import React from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <div className="py-4 shadow-sm ">
      <div className="w-[70%]  mx-auto justify-between flex">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4 ">
          <ul className="md:flex gap-4 items-center hidden font-semibold ">
            {Menu.map((item, index) => (
              <Link href={item.path}>
                {" "}
                <li className="hover:text-primary cursor-pointer hover:scale-105">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <Button variant="default">Sign In</Button>
        </div>
      </div>
    </div>
  );
}
