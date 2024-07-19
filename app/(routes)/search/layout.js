import React from "react";
import CategoryList from "./_component/CategoryList";
import Footer from "@/app/_components/Footer";

export default function SearchLayout({ children, params }) {
  return (
    <div className="w-full flex  mx-auto ">
      {/**Category */}
      <div className=" md:w-[40vw] lg:w-[20vw] hidden  md:block min-h-full">
        <CategoryList />
      </div>
      <div className="w-[70vw] md:[50vw] lg:[75vw] px-6 flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
