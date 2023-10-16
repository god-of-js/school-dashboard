import AuthHeroImage from '../assets/graduation-caps.jpeg';
import AppLogo from '../assets/app-logo.svg';
import { Outlet } from 'react-router-dom';
export default function AuthLayout() {
  return (
    <div className="flex h-screen">
      <div
        className="hidden md:block md:w-3/6 lg:w-4/6 relative h-full p-2 bg-purple-50 bg-cover bg-no-repeat "
        style={{ backgroundImage: `url(${AuthHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-90" />
      </div>
      <div className="max-w-lg mx-auto md:w-3/6 px-16 py-12">
        <div className="flex items-center mb-12 gap-2">
          <img src={AppLogo} alt="school logo" />
          <span className="text-lg text-gray-500 font-bold">School</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
