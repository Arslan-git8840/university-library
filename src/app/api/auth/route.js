import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET(request) {
  // Check for required environment variables
  if (!process.env.NEXT_PUBLIC_PUBLIC_KEY || !process.env.PRIVATE_KEY || !process.env.NEXT_PUBLIC_URL_ENDPOINT) {
    return NextResponse.json({ error: "Missing environment variables." }, { status: 500 });
  }

  try {
    const authParams = imagekit.getAuthenticationParameters();
    // return NextResponse.json(authParams);
    // added by me later 
    return NextResponse.json(authParams, {
      headers: {
        "Access-Control-Allow-Origin": "https://university-library-tan.vercel.app", // Replace with your frontend's origin
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error fetching authentication parameters:", error);
    return NextResponse.json({ error: "Failed to retrieve authentication parameters." }, { status: 500 });
  }
}


// later added by me

// OPTIONS handler for preflight requests
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://university-library-tan.vercel.app", // Replace with your frontend's origin
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
