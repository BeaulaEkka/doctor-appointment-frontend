"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "./SearchIcon";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

export default function Search() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp.data.data); // Log the response data
      setCategoryList(resp.data.data);
    });
  };

  return (
    <div className="flex flex-col justify-center gap-3 text-center w-full py-24 bg-blue-50">
      <div className="lg:w-[70%] w-[95%] mx-auto">
        <h2 className="font-bold text-4xl">Search for a Doctor</h2>
        <p className="text-gray-400 pt-2">
          Search for a Doctor and book your Appointment
        </p>
        <div className="flex w-full max-w-sm items-center space-x-2 self-center my-12 mx-auto">
          <Input type="text" placeholder="Search" />
          <Button type="submit" className="flex gap-2">
            <SearchIcon />
            Search
          </Button>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-6 flex-wrap mx-auto ">
            {categoryList.length > 0
              ? categoryList.map((item, index) => {
                  if (index < 5) {
                    const imageUrl =
                      item.attributes?.Icon?.data?.[0]?.attributes?.url;

                    return (
                      <Link href={"/search/" + item.attributes.Name}>
                        <div key={item.id} className="capitalize flex gap-4">
                          <div className="flex lg:w-56 w-[400px] lg:gap-8 gap-2">
                            <div className="bg-white/80 p-4 rounded-md flex flex-col w-full justify-center shadow-md hover:scale-110 transition-all cursor-pointer">
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={item.attributes.Name}
                                  width={92}
                                  height={92}
                                  className="flex items-center self-center"
                                />
                              ) : (
                                <div className="w-40 h-40 flex items-center justify-center">
                                  No Image Available
                                </div>
                              )}
                              <h1 className="text-gray-400">
                                {item.attributes.Name}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })
              : [1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index} className="flex gap-4 animate-pulse ">
                    <div className="h-[110px] bg-white w-[220px] rounded-lg "></div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
