import {
  SquaresFour,
  ListBullets,
  BookOpen,
  Books,
  GearSix,
  Database,
  BookBookmark,
  SignOut,
} from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';

import AppLogo from '../../assets/app-logo.svg';

export default function TheSidebar() {
  const router = useLocation();
  const routes = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <SquaresFour size={20} />,
    },
    {
      path: '/tasks',
      name: 'Tasks',
      icon: <ListBullets size={20} />,
    },
    {
      path: '/courses',
      name: 'Courses',
      icon: <BookBookmark size={20} />,
    },
    {
      path: '/score',
      name: 'Score',
      icon: <BookOpen size={20} />,
    },
    {
      path: '/library',
      name: 'Library',
      icon: <Books size={20} />,
    },
    {
      path: '/database',
      name: 'Database',
      icon: <Database size={20} />,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <GearSix size={20} />,
    },
  ];

  const activeRoute = router.pathname;

  function logUserOut() {
    localStorage.removeItem('uid');
    window.location.reload();
  }

  return (
    <nav className="hidden relative md:block h-screen border-r-2 border-gray-25 w-1/6">
      <div className="flex items-center justify-center mb-16 gap-2 py-4">
        <img src={AppLogo} alt="school logo" />
        <span className="text-2xl text-gray-500 font-bold">School</span>
      </div>

      <ul>
        {routes.map((route, index) => (
          <li className="h-12 p-0 flex items-start mt-1" key={index}>
            <Link
              to={route.path}
              className={`w-full border-l-4  ${
                activeRoute === route.path
                  ? 'text-primary border-primary bg-gray-10'
                  : 'text-gray-900 text-sm border-transparent hover:text-primary hover:border-primary hover:bg-gray-10'
              }`}
            >
              <div className="h-12 flex items-center gap-4 w-4/5 mx-auto">
                {route.icon}
                <span>{route.name}</span>
              </div>
            </Link>
          </li>
        ))}
        <li
          className="h-12 p-0 cursor-pointer w-full mb-12 absolute bottom-0 flex border-l-4 text-gray-900 text-sm border-transparent hover:text-danger hover:border-danger hover:bg-danger-10 items-start mt-1"
          onClick={logUserOut}
        >
          <div className="h-12 flex items-center gap-4 w-4/5 mx-auto">
            <SignOut size={20} />
            <span>Log out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
