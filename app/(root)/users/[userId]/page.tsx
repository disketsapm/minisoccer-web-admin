import { UserForm } from './components/user-form';
import { UserService } from '@/services/user/user.service';

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const userService = new UserService();

  let response: any = {};
  if (params.userId !== 'new') {
    response = await userService.getListUser({ _id: params.userId });
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm data={response?.data ?? null} />
      </div>
    </div>
  );
};

export default UserPage;
