"use client";

import React from "react";
import { cn } from "@/lib/utils";
import BookCoverSvg from "@/components/BookCoverSvg";
import { IKImage } from "imagekitio-next";




const BookCover = ({
  className,
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10 top-0"
        style={{ left: "12%", width: "87.5%", height: "88%", }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
};
export default BookCover;