import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PageHeading = ({ title, bred3, bred3link }: PageHeadingParams) => {
  return (
    <div className="bg-primaryLight rounded-md py-6 px-9 max-xl:px-5 ">
      <p className="text-18 font-semibold  items-center gap-2">{title}</p>

      <Breadcrumb className="mt-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-gray-600">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {bred3 ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={bred3link} className="text-gray-600">
                  {bred3}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : (
            ""
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-600">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageHeading;
