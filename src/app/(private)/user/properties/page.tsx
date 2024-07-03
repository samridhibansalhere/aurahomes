import PageTitle from "@/components/page-title";
import React, { Suspense } from "react";
import PropertiesTable from "./_components/properties-table";
import LinkButton from "@/components/link-button";
import Filters from "@/components/filters";
import Loader from "@/components/loader";

function Properties({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create Property"
          path="/user/properties/create-property"
        />
      </div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Loader />} key={key}>
        <PropertiesTable searchParams={searchParams} />
        <div className="mt-4 text-red-600">
          **Your properties will only appear on the homescreen once you have been approved by an admin. To check your approval status, please go through your account.**
        </div>
      </Suspense>
    </div>
  );
}

export default Properties;
