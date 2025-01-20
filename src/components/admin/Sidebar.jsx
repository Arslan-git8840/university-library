import { User, Settings, BookImage, House, UserCog, ShoppingBasket } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

const items = [
    {
        title: "Home",
        url: "/admin",
        icon: House,
    },
    {
        title: "All Users",
        url: "/admin/users",
        icon: User,
    },
    {
        title: "All Books",
        url: "/admin/books",
        icon: BookImage,
    },
    {
        title: "Borrow Requests",
        url: "/admin/borrowrequests",
        icon: ShoppingBasket,
    },
    {
        title: "Account Requests",
        url: "/admin/accountrequests",
        icon: UserCog,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className={`p-8 bg-white text-lg`}>
            <SidebarContent>
                <SidebarGroup>
                    <div className="mb-4">
                        <div className="logo flex items-center gap-3">
                            <div className="p-[14px] h-[60px] w-[60px] flex rounded-full bg-primary-admin">
                                <Image
                                    src="/icons/logo.svg"
                                    alt="logo"
                                    height={45}
                                    width={45}
                                />
                            </div>
                            <h1 className={`font-bold text-xl text-primary-admin/80 `}>BOOKWISE</h1>
                        </div>
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className={`hover:bg-primary-admin rounded-lg`}>
                                    <SidebarMenuButton asChild className={`hover:bg-primary-gold p-6 px-3  font-semibold text-base`}>
                                        <Link href={item.url}>
                                            <item.icon className="font-bold" size={36} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}