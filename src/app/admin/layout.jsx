
import { auth } from '@/auth'
import { AppSidebar } from '@/components/admin/Sidebar'
import Search from '@/components/Search'
// import { Input } from '@/components/ui/input'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
// import { SearchIcon } from 'lucide-react'
import { Urbanist } from 'next/font/google'
import { redirect } from 'next/navigation'
import React from 'react'
const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600']
})

const layout = async ({ children }) => {
    const session = await auth();

    const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);

    if (!session || user[0]?.role !== 'ADMIN') {
        redirect('/');
    }
    return (
        <div className={`min-h-screen bg-sidebar flex ${urbanist.className}`}>
            <SidebarProvider>
                <AppSidebar />
                <main className=' overflow-hidden w-full'>
                    <SidebarTrigger />
                    <div className='lg:px-8 px-2 py-2 bg-gray-200'>
                        <div className="p-4  bg-white flex lg:flex-row flex-col gap-2 justify-between items-center rounded-lg">
                            <h1 className="text-lg whitespace-nowrap">
                                Welcome to bookwise, <span className="text-xl font-semibold text-blue-500">Adrian</span>
                            </h1>
                            {/* Search Input */}
                            {/* <div className="relative w-full lg:ml-[12%] ml-[10%]">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <Input
                                    className="ld:w-96 w-[90%] pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                    placeholder="Search books..."
                                />
                            </div> */}
                            <Search />
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default layout