"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Page() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookingList();
  }, [user]);

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then((resp) => {
      console.log("getUserBookingList", resp.data.data);
      setBookingList(resp.data.data);
    });
  };

  const filterUserBooking = (type) => {
    const result = bookingList.filter((item) =>
      type == "upcoming"
        ? new Date(item.attributes.Date) >= new Date()
        : new Date(item.attributes.Date) <= new Date()
    );
    console.log("results", result);
    return result;
  };

  return (
    <div className="w-[70%] min-h-screen mx-auto my-16 ">
      <h2 className="text-2xl font-semibold my-5">My Bookings</h2>
      <Tabs defaultValue="upcoming" className="w-fulls">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="expired">Expired Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            expired={false}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
