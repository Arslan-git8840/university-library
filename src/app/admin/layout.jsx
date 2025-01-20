
import { AppSidebar } from '@/components/admin/Sidebar'
import { Input } from '@/components/ui/input'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SearchIcon } from 'lucide-react'
import { Urbanist } from 'next/font/google'
import React from 'react'
const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600']
})

const layout = async ({ children }) => {
    return (
        <div className={`min-h-screen bg-sidebar flex ${urbanist.className}`}>
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full overflow-hidden'>
                    <SidebarTrigger />
                    <div className='px-8 py-2 bg-gray-200'>
                        <div className="p-4  bg-white flex justify-between items-center rounded-lg">
                            <h1 className="text-lg">
                                Welcome to bookwise, <span className="text-xl font-semibold text-blue-500">Adrian</span>
                            </h1>
                            {/* Search Input */}
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                <Input
                                    className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                    placeholder="Search books..."
                                />
                            </div>
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default layout