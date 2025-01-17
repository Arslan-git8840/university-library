"use client";

import React from "react";
import BookCoverSvg from "@/components/BookCoverSvg v2";
import { IKImage } from "imagekitio-next";




const BookCover = ({
    coverColor = "#012B48",
    coverUrl
}) => {
    return (
        <div
            className={
                "relative transition-all duration-300"}
        >
            <BookCoverSvg coverColor={coverColor} />

            <div
                className="absolute z-10 inset-0 rounded-lg"
                style={{ left: "12.5%", width: "100%", height: "87.4%" }}
            >
                <IKImage
                    path={coverUrl}
                    urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                    loading="lazy"
                    className="w-full h-full rounded-lg"
                    width={1000}
                    height={1000}
                />
            </div>
        </div>
    );
};
export default BookCover;