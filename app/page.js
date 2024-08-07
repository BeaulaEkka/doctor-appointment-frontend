"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import Search from "./_components/Search";
import DoctorList from "./_components/DoctorList";
import { useEffect, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    });
  };
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between py-24  mx-auto flex-grow">
        <Hero />
        <Search />
        <div className="w-[70%]">
          <DoctorList doctorList={doctorList} />
        </div>

        <SpeedInsights />
      </main>
    </div>
  );
}
