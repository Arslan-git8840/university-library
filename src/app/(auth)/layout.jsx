import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
const Layout = async ({ children }) => {

    // const session = await auth();
    // if (!session) return;
    // // if (session) redirect('/')

    // const dbUser = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
    // if (session && dbUser.length > 0) redirect('/')
    const session = await auth();

    if (session?.user?.email) {
        const dbUser = await db
            .select()
            .from(users)
            .where(eq(users.email, session.user.email))
            .limit(1);

        if (dbUser.length > 0) {
            redirect("/"); // ✅ Redirect logged-in user to home or dashboard
        }
    }



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