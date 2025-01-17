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
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error fetching authentication parameters:", error);
    return NextResponse.json({ error: "Failed to retrieve authentication parameters." }, { status: 500 });
  }
}
