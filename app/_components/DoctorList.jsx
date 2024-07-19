import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function DoctorList({
  doctorList,
  heading = "Popular Doctors",
}) {
  return (
    <div className="my-16 lg:w-[100%] w-[90%]">
      <h1 className="mb-16 font-bold text-blue-500 text-2xl pl-2">
        {decodeURIComponent(heading)}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-6 mx-auto">
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => {
              const imageUrl =
                doctor.attributes?.Image?.data[0]?.attributes?.url || "";
              return (
                <div key={index}>
                  <div className="h-[440px] w-[300px] flex flex-col gap-4 rounded-md p-4 justify-left text-left shadow-md hover:border-2 hover:border-gray-300">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={doctor.attributes.Name}
                        width={300}
                        height={300}
                        priority={true}
                        className="object-cover rounded-md shadow-md h-48"
                      />
                    )}
                    <div className="flex flex-grow flex-col gap-1 text-gray-400">
                      <p>
                        {doctor.attributes.categories.data.map(
                          (category, catIndex) => (
                            <span
                              key={catIndex}
                              className="bg-blue-300/50 text-xs text-primary px-2 py-1 rounded-lg mr-2 text-nowrap"
                            >
                              {category.attributes.Name}
                            </span>
                          )
                        )}
                      </p>
                      <h1 className="font-bold text-gray-900 mt-2">
                        Dr. {doctor.attributes.Name}
                      </h1>
                      <p className="text-md text-blue-600 font-semibold">
                        {doctor.attributes.Years_of_Experience} years
                      </p>
                      <p className="flex wrap-text">
                        {doctor.attributes.Address}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <Link href={"/details/" + doctor?.id}>
                        <Button className="bg-white border-2 border-blue-600 px-4 py-2 rounded-sm text-blue-600 hover:bg-primary hover:border-transparent hover:text-white">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className="flex flex-col gap-4 animate-pulse">
                <div className="h-[210px] bg-blue-50 w-full rounded-lg"></div>
                <div className="h-[20px] bg-blue-50 w-full rounded-lg"></div>
                <div className="h-[20px] w-[160px] bg-blue-50 rounded-lg"></div>
              </div>
            ))}
      </div>
    </div>
  );
}
