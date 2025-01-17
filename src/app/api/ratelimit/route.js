// import { NextResponse } from "next/server";
// import { ratelimit } from "@/lib/ratelimit";
// import { headers } from "next/headers";
// export async function GET() {
//   const headersList = headers();
//   const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";
//   const { success, limit, remaining, reset } = await ratelimit.limit(ip);
//   console.log("limit", limit, "remaining", remaining, "reset", reset);
//   if (!success) {
//     return new NextResponse("Too many requests", {
//       status: 429,
//     });
//   }
//   return NextResponse.json({ message: "Hello World", limit, remaining, reset,ip });
// }
