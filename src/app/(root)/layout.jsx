import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { Urbanist } from 'next/font/google'
const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600']
})

const Layout =async ({ children }) => {
    const session = await auth();
    // if(!session) redirect('/api/auth/signin');
    
    return (
        <div className={`min-h-screen bg-cover bg-top bg-dark-100 bg-pattern ${urbanist.className}`}>
            <Header />
            <div className="max-w-7xl w-full mx-auto md:px-16 xs:px-10 px-5">
                {children}
            </div>
        </div>
    );
}

export default Layout
