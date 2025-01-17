import { auth } from "@/auth"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export async function Avatar() {
    const session = await auth()
    return (
      <Avatar>
        <AvatarImage src={session?.user?.image} alt="@shadcn" />
        <AvatarFallback className="bg-amber-100">
            {session?.user?.name || "IN"}
          </AvatarFallback>
      </Avatar>
    )
  }
  