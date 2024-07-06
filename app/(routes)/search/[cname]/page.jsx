"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    console.log("params on search[cname]page", params.cname);
    getDoctors();
  }, []);

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(params.cname).then((resp) => {
      setDoctorList(resp.data.data);
    });
  };

  return (
    <div>
      <DoctorList heading={params.cname} doctorList={doctorList} />
    </div>
  );
}
