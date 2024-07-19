"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import {
  Clock9Icon,
  CrownIcon,
  MapPinIcon,
  Medal,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookAppointments from "../_components/BookAppointments";
import Link from "next/link";

export default function Details({ params }) {
  const [doctorDetails, setDoctorDetails] = useState();
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);

  useEffect(() => {
    getDoctorById();
  }, []);

  useEffect(() => {
    if (doctorDetails) {
      fetchSuggestedDoctors();
    }
  }, [doctorDetails]);

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then((resp) => {
      console.log("resp", resp.data.data);
      setDoctorDetails(resp.data.data);
    });
  };
  const fetchSuggestedDoctors = () => {
    if (doctorDetails && doctorDetails.attributes.categories.data.length > 0) {
      const category =
        doctorDetails.attributes.categories.data[0].attributes.Name;
      GlobalApi.getDoctorByCategory(category).then((resp) => {
        setSuggestedDoctors(
          resp.data.data.filter((doctor) => doctor.id !== doctorDetails.id)
        );
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-6 lg:w-[70%] md:w-[90%] w-[90%] mx-auto my-16 min-h-screen">
      <div className="flex gap-4 flex-wrap justify-between">
        <div className="flex lg:w-[70%] w-full justify-between">
          {doctorDetails && (
            <div className="flex flex-col">
              <div className="flex gap-10 flex-wrap w-full border rounded-md p-6 shadow-md items-center">
                <div className="relative lg:w-96 w-[100%] ">
                  <Image
                    src={doctorDetails.attributes.Image.data[0].attributes.url}
                    width={500}
                    height={300}
                    alt={doctorDetails.attributes.Name}
                    className="object-cover rounded-md lg:w-96 w-full h-80"
                    quality={65}
                  />
                  {doctorDetails.attributes.Premium && (
                    <div className="absolute top-4 left-4 z-10 bg-blue-500 p-1 rounded-full">
                      <CrownIcon width={15} height={15} color="white" />
                    </div>
                  )}
                </div>

                <div className="">
                  <h3 className="text-3xl font-bold ">
                    Dr. {doctorDetails.attributes.Name}
                  </h3>
                  <div className="flex gap-2 mt-4 ">
                    {doctorDetails.attributes.categories.data.map(
                      (category, index) => (
                        <div
                          key={index}
                          className="text-gray-700 bg-blue-200 px-4 py-1 rounded-full text-sm"
                        >
                          {category.attributes.Name}
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex flex-col gap-2 my-9">
                    <div className="text-gray-700 flex gap-2">
                      <div className="text-primary">
                        <PhoneCall />
                      </div>
                      {doctorDetails.attributes?.Phone ? (
                        <p>{doctorDetails.attributes.Phone}</p>
                      ) : (
                        <p>+31 06 1212 1212</p>
                      )}
                    </div>

                    <p className="text-gray-700 flex gap-2">
                      {" "}
                      <div className="text-primary">
                        <Medal />
                      </div>
                      {doctorDetails.attributes.Years_of_Experience} years of
                      experience.
                    </p>
                    <p className="text-gray-700 flex gap-2">
                      <div className="text-primary">
                        <Clock9Icon />
                      </div>
                      {doctorDetails.attributes.StartTime.slice(0, 5)} -{" "}
                      {doctorDetails.attributes.EndTime.slice(0, 5)}
                    </p>
                    <p className="text-gray-700 flex gap-2">
                      {" "}
                      <div className="text-primary">
                        <MapPinIcon />
                      </div>
                      {doctorDetails.attributes.Address}
                    </p>
                  </div>

                  <div className="mt-10">
                    <BookAppointments doctorDetails={doctorDetails} />
                  </div>
                </div>
              </div>
              <div className="text-gray-700 my-12 border rounded-md p-6 flex flex-col gap-4 shadow-md">
                <h3 className="text-xl font-bold my-2">About</h3>
                {doctorDetails.attributes.About &&
                  doctorDetails.attributes.About.length > 0 && (
                    <p>{doctorDetails.attributes.About[0].children[0].text}</p>
                  )}

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Urna nunc id cursus metus aliquam eleifend. Integer vitae
                  justo eget magna. Venenatis lectus magna fringilla urna
                  porttitor rhoncus dolor purus non. Sed nisi lacus sed viverra
                  tellus in hac habitasse. Non arcu risus quis varius.
                  Pellentesque dignissim enim sit amet. Interdum velit euismod
                  in pellentesque massa placerat duis ultricies lacus. Rhoncus
                  aenean vel elit scelerisque. Elementum nibh tellus molestie
                  nunc non blandit massa. Arcu non sodales neque sodales ut.
                  Neque vitae tempus quam pellentesque nec nam aliquam. Mi sit
                  amet mauris commodo quis imperdiet. Vitae proin sagittis nisl
                  rhoncus mattis rhoncus urna neque. Gravida neque convallis a
                  cras semper auctor neque vitae tempus.
                </p>

                <p>
                  Pretium vulputate sapien nec sagittis aliquam. Vitae sapien
                  pellentesque habitant morbi tristique senectus et netus.
                  Cursus turpis massa tincidunt dui. Ac auctor augue mauris
                  augue neque gravida in fermentum et. Consectetur libero id
                  faucibus nisl tincidunt eget nullam non. Nisi porta lorem
                  mollis aliquam ut porttitor leo a diam. Amet massa vitae
                  tortor condimentum lacinia quis vel. Purus in massa tempor nec
                  feugiat. Enim diam vulputate ut pharetra sit amet aliquam id
                  diam. Nulla posuere sollicitudin aliquam ultrices sagittis
                  orci. Volutpat consequat mauris nunc congue nisi vitae. Lacus
                  sed viverra tellus in hac habitasse platea. At consectetur
                  lorem donec massa sapien. Gravida cum sociis natoque penatibus
                  et magnis.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 w-[100%] md:w-[100%] lg:w-[27%] ">
          <h1 className="text-lg font-bold pb-4 ">Suggestions</h1>
          <div className="flex gap-4 flex-wrap">
            {suggestedDoctors.map((doctor, index) => (
              <div
                key={index}
                className="flex items-center  gap-4 border p-4 rounded-md shadow-md  flex-wrap lg:w-full"
              >
                <div className="rounded-full overflow-hidden w-[70px] h-[70px]  ">
                  <Image
                    src={doctor.attributes.Image.data[0].attributes.url}
                    width={70}
                    height={70}
                    alt={doctor.attributes.Name}
                    className="object-cover w-full h-full "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-md font-semibold">
                    Dr. {doctor.attributes.Name}
                  </h3>
                  <p class="text-xs text-gray-900 bg-blue-100 px-2 py-1 rounded-full w-fit">
                    {doctor.attributes.categories.data[0].attributes.Name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {doctor.attributes.Years_of_Experience} years of experience
                  </p>
                  <Link href={"/details/" + doctor?.id}>
                    <Button
                      variant="outline"
                      className="mt-4 border border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
