import prisma from "@/config/db";
import { Property } from "@prisma/client";
import Link from "next/link";
import React from "react";

async function PropertiesData({ searchParams }: { searchParams: any }) {
  // Fetch properties where the associated user is approved
  const properties: Property[] = await prisma.property.findMany({
    where: {
      ...searchParams,
      user: {
        approved: true,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: true, // Include user data to ensure the filter works
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {properties.map((property) => (
        <Link key={property.id} href={`/property/${property.id}`} passHref>
          <div className="block border rounded border-solid border-gray-300 overflow-hidden cursor-pointer">
            <img
              src={property.images[0]}
              alt=""
              className="w-full h-60 object-cover rounded-t property-main-image"
            />
            <div className="p-3 flex flex-col">
              <span className="text-sm text-primary font-bold">
                {property.name}
              </span>
              <span className="text-gray-700 text-xs">
                {property.city}, {property.landmark}
              </span>
            </div>

            <div className="p-3 bg-gray-100 flex justify-between items-center rounded-b">
              <span className="text-primary text-xl font-bold">
                $ {property.price}
              </span>
              <span className="text-sm text-primary font-semibold">
                View Details
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PropertiesData;
