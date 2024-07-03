import { Button } from "@/components/ui/button";
import { DiscAlbum } from "lucide-react";
import Image from "next/image";

export default function DoctorList({ doctorList }) {
  return (
    <div className="my-24 lg:w-[70%] w-[90%]">
      <h1 className="mb-24 font-bold text-blue-500 text-2xl">
        Meet Our Doctors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {doctorList &&
          doctorList.map((doctor, index) => {
            const imageUrl =
              doctor.attributes?.Image?.data[0]?.attributes?.url || "";
            return (
              <div key={index}>
                {imageUrl && (
                  <div className="h-[440px] w-full flex flex-col gap-4 rounded-md p-4 justify-left  text-left shadow-md">
                    <Image
                      src={imageUrl}
                      alt={doctor.attributes.Name}
                      width={300}
                      height={200}
                      className="h-[200px] w-full object-cover rounded-md shadow-md"
                    />
                    <div className="flex flex-grow flex-col gap-1 text-gray-400 ">
                      <p>
                        <span className="bg-blue-300/50 text-sm text-primary  px-2 py-1 rounded-lg">
                          {doctor.attributes.category.data.attributes.Name}
                        </span>
                      </p>
                      <h1 className="font-bold text-gray-900 mt-2">
                        Dr.{doctor.attributes.Name}
                      </h1>
                      <p className="text-md text-blue-500 font-semibold">
                        {doctor.attributes.Years_of_Experience} years
                      </p>
                      <p className="flex wrap-text">
                        {doctor.attributes.Address}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <Button className="bg-primary px-4 py-2 rounded-sm text-white hover:bg-primary/90">
                        Book Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
