import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarDays, Clock10, MapPinIcon, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

export default function BookingList({ bookingList, expired, updateRecord }) {
  const formatTime = (time) => {
    const hours = new Date(`1970-01-01T${time}`).getHours();
    return hours < 12 ? "AM" : "PM";
  };

  const onDeleteBooking = (item) => {
    // console.log("item", item);
    GlobalApi.deleteBooking(item.id).then((resp) => {
      // console.log("resp", resp);
      if (resp) {
        toast("Appointment Deleted Successfully!");
        updateRecord();
      }
    });
  };

  return (
    <div>
      {bookingList.map((item, index) => {
        const doctor = item.attributes.doctor.data.attributes;
        const categories = doctor.categories.data.map(
          (category) => category.attributes.Name
        );

        return (
          <div
            key={index}
            className="border w-full flex  flex-row gap-6 flex-wrap  my-5 p-4 rounded-md shadow-sm lg:items-center"
          >
            <div className="w-[74px] h-[74px] rounded-full overflow-hidden">
              <Image
                src={doctor.Image?.data[0]?.attributes?.url}
                height={74}
                width={74}
                alt={doctor.Name}
                className="object-cover rounded-full w-[74px] h-[74px] "
              />
            </div>
            <div className="flex justify-between items-center flex-grow flex-wrap gap-4">
              <div className="text-sm flex flex-col gap-2">
                <p className="text-lg font-semibold">{doctor.Name}</p>
                <p className="text-xs text-gray-900 bg-blue-100 px-2 py-1 rounded-full w-fit">
                  {categories.join(", ")}
                </p>
                <div className="flex gap-4">
                  <div className="text-primary">
                    <MapPinIcon width={18} />
                  </div>
                  <p>{doctor.Address}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary">
                    <PhoneCall width={18} />
                  </div>
                  <div>
                    <p>{doctor.Phone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary">
                    <CalendarDays width={18} />
                  </div>
                  <p>{item.attributes.Date}</p>
                </div>
                <div className="flex gap-4 font-semibold">
                  <div className="text-primary">
                    <Clock10 width={18} />
                  </div>
                  <p>
                    {item.attributes.Time} {formatTime(item.attributes.Time)}
                  </p>
                </div>
              </div>

              <div>
                {!expired ? (
                  <CancelAppointment
                    onContinueClick={() => onDeleteBooking(item)}
                  />
                ) : (
                  <Button
                    variant="outline"
                    className="border border-red-600 hover:bg-red-600 text-red-500 hover:text-white"
                    onClick={() => onDeleteBooking(item)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
