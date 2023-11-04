import { SidebarLink } from '@/types';

import { AiOutlineHome, AiOutlineTags } from 'react-icons/ai';
import { BiGroup, BiCollection } from 'react-icons/bi';
import { TbBook } from 'react-icons/tb';
import { BsPerson, BsPatchQuestion } from 'react-icons/bs';

export const sidebarLinks: SidebarLink[] = [
  {
    route: '/',
    label: 'Home',
    icon: <AiOutlineHome className="h-6 w-6 mx-auto" />,
  },
  {
    route: '/community',
    label: 'Community',
    icon: <BiGroup className="h-6 w-6 mx-auto" />,
  },
  {
    route: '/collection',
    label: 'Collections',
    icon: <BiCollection className="h-6 w-6 mx-auto" />,
  },
  {
    route: '/Study',
    label: 'Study Group',
    icon: <TbBook className="h-6 w-6 mx-auto" />,
  },
  {
    route: '/tags',
    label: 'Tags',
    icon: <AiOutlineTags className="h-6 w-6 mx-auto" />,
  },
  {
    route: '/profile',
    label: 'Profile',
    icon: <BsPerson className="h-6 w-6 mx-auto" />,
  },
  {
    route: '/ask',
    label: 'Ask',
    icon: <BsPatchQuestion className="h-6 w-6 mx-auto" />,
  },
];
