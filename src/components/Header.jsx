'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const Header = () => {
  const { data: session, status } = useSession();
  const handleLogOut = async () => {
    await signOut();
  }
  return (
    <header className="py-6 px-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-10">
        <li className="font-bebasNeue text-lg text-slate-200 tracking-wider mb-10">
          <Link href='/library?pageSize=8&page=1'>Library</Link>
        </li>
        <li>
          <div
            className="mb-10"
          >
            {session?.user ? <div className="flex gap-4">
              <Button className='bg-primary-gold'>
                <Link href='/profile'>Profile</Link>
              </Button> <Button className='bg-primary-gold' onClick={handleLogOut}>
                LogOut
              </Button></div> : <Button className='bg-primary-gold' variant='link'>
              <Link href='/api/auth/signin'>SignIn</Link>
            </Button>}
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;