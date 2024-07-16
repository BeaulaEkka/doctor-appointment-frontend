// import { Button } from "@/components/ui/button";
// import { DiscAlbum } from "lucide-react";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";
// export default function DoctorList({
//   doctorList,
//   heading = "Popular Doctors",
// }) {
//   return (
//     <div className="my-24 lg:w-[70%] w-[90%]">
//       <h1 className="mb-24 font-bold text-blue-500 text-2xl">{heading}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
//         {doctorList.length > 0
//           ? doctorList.map((doctor, index) => {
//               const imageUrl =
//                 doctor.attributes?.Image?.data[0]?.attributes?.url || "";
//               return (
//                 <div key={index}>
//                   {imageUrl && (
//                     <div className="h-[440px] w-full flex flex-col gap-4 rounded-md p-4 justify-left  text-left shadow-md">
//                       <Image
//                         src={imageUrl}
//                         alt={doctor.attributes.Name}
//                         width={300}
//                         height={200}
//                         className="h-[200px] w-full object-cover rounded-md shadow-md"
//                       />
//                       <div className="flex flex-grow flex-col gap-1 text-gray-400 ">
//                         <p>
//                           <span className="bg-blue-300/50 text-sm text-primary  px-2 py-1 rounded-lg">
//                             {
//                               doctor.attributes?.category?.data?.attributes
//                                 ?.Name
//                             }
//                           </span>
//                         </p>
//                         <h1 className="font-bold text-gray-900 mt-2">
//                           Dr.{doctor.attributes.Name}
//                         </h1>
//                         <p className="text-md text-blue-600 font-semibold">
//                           {doctor.attributes.Years_of_Experience} years
//                         </p>
//                         <p className="flex wrap-text">
//                           {doctor.attributes.Address}
//                         </p>
//                       </div>
//                       <div className="flex justify-start">
//                         <Button className="bg-white border-2 border-blue-600 px-4 py-2 rounded-sm text-blue-600 hover:bg-primary hover:border-transparent hover:text-white">
//                           Book Now
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           : [1, 2, 3, 4, 5, 6].map((item, index) => (
//               <div className="flex flex-col gap-4 animate-pulse">
//                 <div className="h-[210px] bg-blue-50 w-full rounded-lg"></div>
//                 <div className="h-[20px] bg-blue-50 w-full rounded-lg"></div>
//                 <div className="h-[20px] w-[160px] bg-blue-50 rounded-lg"></div>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function DoctorList({
  doctorList,
  heading = "Popular Doctors",
}) {
  return (
    <div className="my-24 lg:w-[70%] w-[90%]">
      <h1 className="mb-24 font-bold text-blue-500 text-2xl">
        {decodeURIComponent(heading)}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => {
              const imageUrl =
                doctor.attributes?.Image?.data[0]?.attributes?.url || "";
              return (
                <div key={index}>
                  <div className="h-[440px] w-full flex flex-col gap-4 rounded-md p-4 justify-left text-left shadow-md hover:border-2 hover:border-gray-300">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={doctor.attributes.Name}
                        width={300}
                        height={300}
                        priority={true}
                        className="object-cover rounded-md shadow-md w-full h-48"
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
