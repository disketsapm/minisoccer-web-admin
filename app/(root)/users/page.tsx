'use client';

import { UsersClient } from './components/client';
import { useGetListUser } from '@/hooks/user/useGetListUser';

const UserPage = () => {
  const { data, error } = useGetListUser();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={data?.results ?? []} />
      </div>
    </div>
  );
};

export default UserPage;
