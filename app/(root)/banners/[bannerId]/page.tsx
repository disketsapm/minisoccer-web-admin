'use client';

import { BannerForm } from './components/user-form';

const UserPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerForm initialData={null} />
      </div>
    </div>
  );
};

export default UserPage;
