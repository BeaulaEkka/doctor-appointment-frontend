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
import { CalendarDays, Clock10Icon } from "lucide-react";
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

  // const isPastTime = (time) => {
  //   return time < new Time().setHours(0, 0, 0, 0);
  // };

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
    <div className="">
      <Dialog>
        <DialogTrigger>
          <Button variant="default">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-3xl ">
          <DialogHeader>
            <DialogTitle className="mb-6">Book Appointment</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="flex flex-col mb-2  rounded-md ">
                  <div className="flex gap-2 py-2 items-center justify-center mb-2 rounded-md">
                    <div className=" flex gap-3 items-center  text-primary ">
                      <CalendarDays />
                    </div>
                    <p>Select Date</p>
                  </div>
                  <div className="border p-2 rounded-md">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="h-72 rounded-md justify-center flex items-center "
                      disabled={isPastDay}
                    />
                  </div>
                </div>
                <div className=" rounded-md p-1 flex flex-wrap gap-2 justify-center items-center">
                  <div className="flex gap-3 items-center text-primary">
                    <Clock10Icon />
                  </div>
                  <p>Select Time</p>
                  <div className="w-96 h-[305px] border rounded-md  pt-12">
                    <div className="md:p-6 p-2 grid  lg:grid-cols-4 md:grid-cols-4 grid-cols-3 gap-1 lg:gap-2 text-xs md:text-sm">
                      {timeSlots.map((timeSlot, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedTimeSlot(timeSlot)}
                          className={`py-2 border flex gap-1 md:gap-2 md:px-3 px-1 rounded-md hover:bg-blue-300 hover:font-semibold justify-center ${
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
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
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
