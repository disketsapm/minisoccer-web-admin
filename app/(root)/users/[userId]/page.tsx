'use client';

import { useUserId } from '@/store/id-store';
import { UserForm } from './components/user-form';
import { useGetUserById } from '@/hooks/user/useGetUserById';
import { useEffect } from 'react';

const UserPage = () => {
  const { userId } = useUserId();
  console.log(userId);

  const { mutate, data } = useGetUserById();
  console.log(data);

  useEffect(() => {
    if (userId) {
      mutate({ _id: userId });
    }
  }, [userId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={null} />
      </div>
    </div>
  );
};

export default UserPage;
