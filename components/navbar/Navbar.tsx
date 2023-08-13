"use client"
import Container from '@/components/Container';
import Logo from '@/components/navbar/Logo';
import Search from '@/components/navbar/Search';
import UserMenu from '@/components/navbar/UserMenu';

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='p-4 border-b-[1px]'></div>
      <Container>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </Container>

    </div>
  );
}

export default Navbar;