import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen  mx-auto ">
      <div className="w-full h-full shadow-md  relative">
        <Image
          src="/images/doctor2.jpg"
          width={950}
          height={150}
          className="w-[100%] h-[450px] object-cover  "
        />
        <div className="w-[70%] mx-auto bg-primary h-20 absolute top-[45%] transform skew-y-12 ">
          <h1 className="absolute top-[45%]  text-4xl  font-bold text-white px-4 py-2  ">
            Committed to Enhancing Healthcare Every Day!
          </h1>
        </div>
      </div>
    </div>
  );
}
