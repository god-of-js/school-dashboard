import { useGetUserProfile } from '../../api/queries';
import { User } from '@phosphor-icons/react';

interface Props {
  children?: React.ReactNode;
}

export default function TheTopNav({ children }: Props) {
  const uid = localStorage.getItem('uid');
  const { data: user } = useGetUserProfile(uid!);

  return (
    <nav
      className={`p-5 border-b-2 border-gray-25 flex w-full ${
        children ? 'justify-between' : 'justify-end'
      }`}
    >
      {children}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="text-gray-100 border border-gray-100 rounded-full p-1">
            <User size="32" />
          </div>
          <div className="text-gray-900 text-sm">{user?.name}</div>
        </div>
      </div>
    </nav>
  );
}
