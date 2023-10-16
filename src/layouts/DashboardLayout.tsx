import { Outlet } from 'react-router-dom';
import { useGetUserProfile } from '../api/queries';
import TheSidebar from '../components/layout/TheSidebar';
import UiLoader from '../components/ui/UiLoader';

export default function DashboardLayout() {
  const uid = localStorage.getItem('uid');
  const { isLoading, data } = useGetUserProfile(uid!);

  console.log(data);

  return (
    <div className="flex">
      <TheSidebar />
      <div className="w-full h-screen md:w-5/6">
        {isLoading ? <UiLoader /> : <Outlet />}
      </div>
    </div>
  );
}
