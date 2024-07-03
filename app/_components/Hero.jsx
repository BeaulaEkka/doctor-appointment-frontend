import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="pb-24 lg:w-[70%] w-[95%]">
      <div className="">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 ">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt=""
              src="/images/ldoc4.jpg"
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl capitalize">
              <span className="text-blue-700">Healthcare </span>made simple.
            </h2>

            <p className="mt-4 text-gray-600">
              Book a doctor and order healthcare services to your home. hic
              atque tenetur quis eius quos ea neque sunt, accusantium soluta
              minus veniam tempora deserunt? Molestiae eius quidem quam
              repellat.
            </p>

            <Button variant="default" className="mt-4">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
