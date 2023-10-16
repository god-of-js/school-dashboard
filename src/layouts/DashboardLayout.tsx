import { Outlet } from 'react-router-dom';
import TheSidebar from '../components/layout/TheSidebar';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <TheSidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
