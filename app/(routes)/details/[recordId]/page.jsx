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
    <div className="flex flex-wrap gap-6 w-[90%] lg:w-[65%] mx-auto mt-16 min-h-screen">
      {/* <h2 className="font-semibold text-xl">Details</h2> */}
      <div className="flex-grow">
        {doctorDetails && (
          <div className="flex flex-col">
            <div className="flex gap-10 flex-wrap w-full border rounded-md p-6 shadow-md items-center">
              <div className="relative">
                <Image
                  src={doctorDetails.attributes.Image.data[0].attributes.url}
                  width={600}
                  height={500}
                  alt={doctorDetails.attributes.Name}
                  className="object-cover  rounded-md w-full h-full"
                  quality={65}
                />
                {doctorDetails.attributes.Premium && (
                  <div className="absolute top-4 left-4 z-10">
                    <CrownIcon width={42} height={42} color="yellow" />
                  </div>
                )}
              </div>
              {/* <div>{doctorDetails.attributes.Premium ? "Yes" : "No"}</div> */}

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
            <div className="text-gray-700  my-12 border rounded-md p-6 flex flex-col gap-4 shadow-md">
              <h3 className="text-xl font-bold my-2">About</h3>
              {doctorDetails.attributes.About &&
                doctorDetails.attributes.About.length > 0 && (
                  <p>{doctorDetails.attributes.About[0].children[0].text}</p>
                )}

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna
                nunc id cursus metus aliquam eleifend. Integer vitae justo eget
                magna. Venenatis lectus magna fringilla urna porttitor rhoncus
                dolor purus non. Sed nisi lacus sed viverra tellus in hac
                habitasse. Non arcu risus quis varius. Pellentesque dignissim
                enim sit amet. Interdum velit euismod in pellentesque massa
                placerat duis ultricies lacus. Rhoncus aenean vel elit
                scelerisque. Elementum nibh tellus molestie nunc non blandit
                massa. Arcu non sodales neque sodales ut. Neque vitae tempus
                quam pellentesque nec nam aliquam. Mi sit amet mauris commodo
                quis imperdiet. Vitae proin sagittis nisl rhoncus mattis rhoncus
                urna neque. Gravida neque convallis a cras semper auctor neque
                vitae tempus.
              </p>

              <p>
                Pretium vulputate sapien nec sagittis aliquam. Vitae sapien
                pellentesque habitant morbi tristique senectus et netus. Cursus
                turpis massa tincidunt dui. Ac auctor augue mauris augue neque
                gravida in fermentum et. Consectetur libero id faucibus nisl
                tincidunt eget nullam non. Nisi porta lorem mollis aliquam ut
                porttitor leo a diam. Amet massa vitae tortor condimentum
                lacinia quis vel. Purus in massa tempor nec feugiat. Enim diam
                vulputate ut pharetra sit amet aliquam id diam. Nulla posuere
                sollicitudin aliquam ultrices sagittis orci. Volutpat consequat
                mauris nunc congue nisi vitae. Lacus sed viverra tellus in hac
                habitasse platea. At consectetur lorem donec massa sapien.
                Gravida cum sociis natoque penatibus et magnis.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="h-screen border shadow-md rounded-md p-6 w-[100%] container lg:w-[30%] ">
        <h1 className="text-lg font-bold">Suggestions</h1>
        <div className="flex flex-col gap-4">
          {suggestedDoctors.map((doctor, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded-md shadow-md"
            >
              <div className="w-[75px] h-[75px] border border-red-500 rounded-full overflow-hidden ">
                <Image
                  src={doctor.attributes.Image.data[0].attributes.url}
                  width={75}
                  height={75}
                  alt={doctor.attributes.Name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Dr. {doctor.attributes.Name}
                </h3>
                <p className="text-sm text-gray-600">
                  {doctor.attributes.categories.data[0].attributes.Name}
                </p>
                <p className="text-sm text-gray-600">
                  {doctor.attributes.Years_of_Experience} years of experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}