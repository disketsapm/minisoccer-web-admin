'use client';

import { UserForm } from './components/user-form';

const UserPage = ({ params }: { params: { userId: string } }) => {
  
  console.log(params);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={null} />
      </div>
    </div>
  );
};

export default UserPage;
