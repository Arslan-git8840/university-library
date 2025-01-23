// import { auth } from "@/auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export async function UserAvatar() {
  // const session = await auth()
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback className="bg-amber-100">
        "IN"
      </AvatarFallback>
    </Avatar>
  )
}
