'use client';

import { useGetListUser } from '@/hooks/user/useGetListUser';
import { UserForm } from './components/user-form';

const UserPage = ({ params }: { params: { userId: string } }) => {
  const { data, isPending } = useGetListUser({ _id: params.userId });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm data={(data?.data as object) ?? null} />
      </div>
    </div>
  );
};

export default UserPage;
