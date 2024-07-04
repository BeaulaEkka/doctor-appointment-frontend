"use client";
import React, { useEffect } from "react";

export default function page({ params }) {
  useEffect(() => {
    console.log("params", params);
  }, []);

  return <div>cname</div>;
}
