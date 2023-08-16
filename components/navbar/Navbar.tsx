"use client"
import Container from '@/components/Container';
import Logo from '@/components/navbar/Logo';
import Search from '@/components/navbar/Search';
import UserMenu from '@/components/navbar/UserMenu';
import { User } from '@prisma/client';

interface NavbarProps {
  currentUser?: User | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='p-4 border-b-[1px]'></div>
      <Container>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>

    </div>
  );
}

export default Navbar;