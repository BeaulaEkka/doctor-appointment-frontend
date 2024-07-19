// "use client";
// import DoctorList from "@/app/_components/DoctorList";
// import GlobalApi from "@/app/_utils/GlobalApi";
// import React, { useEffect, useState } from "react";

// export default function page({ params }) {
//   const [doctorList, setDoctorList] = useState([]);

//   useEffect(() => {
//     console.log("params on search[cname]page", params.cname);
//     getDoctors();
//   }, []);

//   const getDoctors = () => {
//     GlobalApi.getDoctorByCategory(params.cname).then((resp) => {
//       setDoctorList(resp.data.data);
//     });
//   };

//   return (
//     <div>
//       <DoctorList heading={params.cname} doctorList={doctorList} />
//     </div>
//   );
// }

"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryExists, setCategoryExists] = useState(true);

  useEffect(() => {
    console.log("params on search[cname] page", params.cname);
    getDoctors();
  }, [params.cname]);

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(params.cname)
      .then((resp) => {
        const data = resp.data.data;
        if (data.length === 0) {
          setCategoryExists(false);
        } else {
          setDoctorList(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error fetching doctors: ", error);
        setCategoryExists(false);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!categoryExists) {
    return (
      <div className="min-h-[50vh] flex flex-grow mx-auto justify-center items-center ">
        <p className="text-center">
          {params.cname} is not present. Please select a category from the list
          on the right.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6">
      <DoctorList heading={params.cname} doctorList={doctorList} />
    </div>
  );
}
