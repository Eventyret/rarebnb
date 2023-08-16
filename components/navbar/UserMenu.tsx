"use client"
import Avatar from '@/components/Avatar';
import MenuItem from '@/components/navbar/MenuItem';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiTrip } from 'react-icons/bi';
import { BsFillBalloonHeartFill, BsFillHouseFill, BsFillHouseHeartFill } from 'react-icons/bs';
import { GrLogout, GrUser, GrUserAdd } from 'react-icons/gr';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => { setIsOpen(!isOpen); }, [isOpen]);
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer' onClick={() => { }}>
          Airbnb your home
        </div>

        <div className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' onClick={toggleOpen}>

          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => { }}
                  label='My Trips'
                  icon={<BiTrip size={18} />}
                />
                <MenuItem
                  onClick={() => { }}
                  label='My favourites'
                  icon={<BsFillBalloonHeartFill size={18} />}
                />
                <MenuItem
                  onClick={() => { }}
                  label='My properties'
                  icon={<BsFillHouseHeartFill size={18} />}
                />
                <MenuItem
                  onClick={() => { }}
                  label='Rarebnb my home'
                  icon={<BsFillHouseFill size={18} />}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label='Sign Out'
                  icon={<GrLogout size={18} />}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Sign In'
                  icon={<GrUser size={18} />}
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='Sign Up'
                  icon={<GrUserAdd size={18} />}
                />
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;