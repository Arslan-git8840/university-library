import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { Urbanist } from 'next/font/google'
import { users } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600']
})

const Layout = async ({ children }) => {
    // const session = await auth();
    // if(!session) redirect('/signup');
    // const userResult = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.email, session.user.email))
    //   .limit(1);
    // const dbUser = userResult[0];
    // if(!dbUser) {
    //     await signOut();
    // }
  

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
