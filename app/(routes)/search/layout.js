import React from "react";
import CategoryList from "./_component/CategoryList";

export default function layout({ children, params }) {
  return (
    <div className="grid grid-cols-4">
      {/**Category */}
      <div>
        <CategoryList category={params.cname} />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
