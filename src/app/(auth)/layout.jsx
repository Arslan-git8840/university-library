import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Layout = async ({ children }) => {

    const session = await auth();
    if(session) redirect('/');
    return (
        <div className="min-h-screen flex">
            <div className={`lg:w-[60%] w-full bg-cover min-h-screen bg-pattern bg-dark-100`} >
                {children}
            </div>

            <div className={`lg:block hidden flex-1 min-h-screen`} >
                <Image src='/librarybg.jpg' height={1000}
                    width={1000} alt='librarybg' className="h-full"></Image>
            </div>
        </div>
    );
}

export default Layout;