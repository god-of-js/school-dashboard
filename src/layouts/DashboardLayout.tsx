import { Outlet } from 'react-router-dom';
import { useGetUserProfile } from '../api/queries';
import TheSidebar from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';

export default function DashboardLayout() {
  const uid = localStorage.getItem('uid') || 'F1xLKP4EBAMmhuEiuu4gvntSkOi1';
  const { isLoading } = useGetUserProfile(uid);

  return (
    <div className="flex">
      <div className="hidden md:block">

      <TheSidebar />
      </div>
      <div className="w-full h-screen overflow-auto md:w-5/6" style={{minWidth: '1200px'}}>
        {isLoading ? <UiLoader /> : <Outlet />}
      </div>
    </div>
  );
}
