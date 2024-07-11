// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarDays } from "lucide-react";

// export default function BookAppointments({ doctorDetails }) {
//   const [date, setDate] = useState(new Date());
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

//   useEffect(() => {
//     if (doctorDetails) {
//       generateTimeSlots(
//         doctorDetails.attributes.StartTime,
//         doctorDetails.attributes.EndTime
//       );
//       console.log("timeSlots", timeSlots);
//     }
//   }, [doctorDetails]);

//   const generateTimeSlots = (startTime, endTime) => {
//     const start = new Date(`1970-01-01T${startTime}:00`);
//     const end = new Date(`1970-01-01T${endTime}:00`);
//     const slots = [];

//     while (start < end) {
//       slots.push(
//         new Date(start).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//       start.setMinutes(start.getMinutes() + 30);
//     }

//     setTimeSlots(slots);
//   };

//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger>
//           <Button varient="default">Book Appointment</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Book Appointment</DialogTitle>
//             <DialogDescription>
//               {/**Calendar */}
//               <div className="grid grid-cols-1 md:grid-cols-2">
//                 <div className="flex flex-col mb-2">
//                   <div className="flex gap-2 py-2">
//                     <div className="flex gap-3 items-center text-primary">
//                       <CalendarDays />
//                     </div>
//                     <p>Select Date</p>
//                   </div>
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     className="rounded-md border"
//                   />
//                 </div>
//                 <div className="border ">
//                   {timeSlots.map((timeSlot, index) => {
//                     <div key={index}>{timeSlot.slot}</div>;
//                   })}
//                   <Button variant="default" className="mt-4">
//                     Confirm Booking
//                   </Button>
//                 </div>{" "}
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

export default function BookAppointments({ doctorDetails }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [note, setNote] = useState("");
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (doctorDetails) {
      console.log("doctorDetails", doctorDetails); // Debugging line
      generateTimeSlots(
        doctorDetails.attributes.StartTime,
        doctorDetails.attributes.EndTime
      );
    }
  }, [doctorDetails]);

  const generateTimeSlots = (startTime, endTime) => {
    console.log("Generating time slots from", startTime, "to", endTime); // Debugging line
    startTime = startTime.split(".")[0];
    endTime = endTime.split(".")[0];

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const slots = [];

    while (start < end) {
      slots.push(
        new Date(start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      const nextSlot = new Date(start);
      nextSlot.setMinutes(nextSlot.getMinutes() + 30);
      start.setTime(nextSlot.getTime());
    }

    console.log("Generated slots:", slots); // Debugging line
    setTimeSlots(slots);
  };

  const isPastDay = (day) => {
    return day < new Date().setHours(0, 0, 0, 0);
  };

  const saveBooking = () => {
    const data = {
      data: {
        UserName: `${user.given_name} ${user.family_name}`,
        Email: user.email,
        Time: selectedTimeSlot,
        Date: date,
        doctor: doctorDetails.id,
        Note: note,
      },
    };

    GlobalApi.bookAppointment(data).then((resp) => {
      console.log("booking appointments", resp);
      if (resp) {
        GlobalApi.sendEmail(data).then((resp) => {
          console.log("email sent", resp);
        });
        toast("Your appointment is successfully booked!");
      }
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="default">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col mb-2">
                  <div className="flex gap-2 py-2">
                    <div className="flex gap-3 items-center text-primary">
                      <CalendarDays />
                    </div>
                    <p>Select Date</p>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={isPastDay}
                  />
                </div>
                <div className="border rounded-md p-1 flex flex-wrap gap-2 justify-center items-center">
                  {timeSlots.map((timeSlot, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTimeSlot(timeSlot)}
                      className={`py-2 bg-blue-100 flex gap-2 px-3 rounded-md hover:bg-blue-300 hover:font-semibold ${
                        timeSlot === selectedTimeSlot
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      {timeSlot}
                    </div>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                disabled={!(date && selectedTimeSlot)}
                onClick={saveBooking}
              >
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
