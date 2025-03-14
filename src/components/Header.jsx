import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { auth } from "@/auth";


const Header = async () => {

  

  const session = await auth();

  return (
    <header className="pt-6 pb-2 sm:px-10 px-4 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-6">
        <li className="font-bebasNeue text-lg text-slate-200 tracking-wider mb-10">
          <Link href='/library?pageSize=8&page=1'>Library</Link>
        </li>
        <li>
          <div
            className="mb-10"
          >
            {session?.user ? <div className="flex gap-4">
              <Link href='/profile'>
                <UserAvatar className={'h-12 w-12'} />
              </Link>
            </div> : <Button className='bg-primary-gold' variant='link'>
              <Link href='/api/auth/signin'>SignIn</Link>
            </Button>}
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;