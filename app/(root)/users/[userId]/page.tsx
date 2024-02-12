import { useUserId } from '@/store/id-store';
import { UserForm } from './components/user-form';
import { useGetUserById } from '@/hooks/user/useGetUserById';
import { useEffect } from 'react';

const UserPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm type={params.userId} />
      </div>
    </div>
  );
};

export default UserPage;
