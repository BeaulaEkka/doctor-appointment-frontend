"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);

  const params = usePathname();
  const category = params.split("/")[2];

  useEffect(() => {
    getCategoryList();
    console.log("params2", params);
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp.data.data); // Log the response data
      setCategoryList(resp.data.data);
    });
  };
  return (
    <div className="h-screen flex fixed flex-col m-5">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList.map((item, index) => (
              <CommandItem
                key={index}
                // command={item.name}
                // description={item.description}
              >
                <Link
                  href={"/search/" + item.attributes.Name}
                  className={`p-2 flex gap-3 items-center cursor-pointer w-full rounded-md ${
                    category == item.attributes.Name && "bg-blue-100 "
                  }`}
                >
                  <Image
                    src={item.attributes?.Icon?.data?.[0]?.attributes?.url}
                    alt={item.attributes.Name}
                    width={30}
                    height={30}
                  />
                  <label htmlFor="">{item.attributes.Name}</label>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
}
