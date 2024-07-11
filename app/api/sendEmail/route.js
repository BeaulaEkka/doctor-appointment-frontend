// import { Resend } from "resend";
// import EmailTemplate from "@/emails";
// import { NextResponse } from "next/server";

// const resend = new Resend(`process.env.RESEND_API_KEY`);
// export async function POST(req) {
//   const response = req.json();
//   try {
//     const data = await resend.emails.send({
//       from: "Doctor-Booking-App@medipoint.com",
//       to: [response.data.Email],
//       subject: "Booking Appointment Confirmation",
//       react: EmailTemplate({ response }),
//     });
//     return NextResponse.json({ data });
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// }
import { Resend } from "resend";
import EmailTemplate from "@/emails";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const response = await req.json();
    console.log("Request Body:", response); // Log the request body

    const data = await resend.emails.send({
      from: "Doctor-Booking-App@beaula-management.nl",
      to: [response.data.Email],
      subject: "Booking Appointment Confirmation",
      react: EmailTemplate({ response }),
    });

    console.log("Email sent successfully:", data); // Log the successful response
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error sending email:", error); // Log the error
    return NextResponse.json({ error: error.message || error });
  }
}
