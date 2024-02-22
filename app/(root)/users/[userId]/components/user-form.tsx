'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { GetListUserResponse } from '@/interfaces/user.interface';
import { useAddUser } from '@/hooks/user/useAddUser';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateUser } from '@/hooks/user/useUpdateUser';
// import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
  roles: z.string().min(1),
});

type UserFormValues = z.infer<typeof formSchema>;

type UserFormProps = {
  data?: GetListUserResponse;
};

export const UserForm = ({ data }: UserFormProps) => {
  console.log(data);
  const params = useParams();
  const router = useRouter();
  const { mutateAsync: addUser } = useAddUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [loading, setLoading] = useState(false);

  const description = data ? 'Edit a User.' : 'Add a new User';
  const title = data ? 'Edit User' : 'Create User';
  const action = data ? 'Save changes' : 'Create';

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: data?._id ?? '',
      email: data?.email ?? '',
      password: data?.password ?? '',
      fullName: data?.fullName ?? '',
      phoneNumber: data?.phoneNumber ?? '',
      roles: data?.roles ?? '',
    },
  });

  // console.log(form.watch());

  const onSubmit = async (dataForm: UserFormValues) => {
    try {
      setLoading(true);
      if (data) {
        updateUser(dataForm);
      } else {
        addUser(dataForm);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:w-[70%] w-full"
        >
          <input
            type="hidden"
            {...form.register('_id')}
          />
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="password"
                      type="password"
                      isPassword
                      showPasswordIcon
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="fullname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Roles</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="float-right"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
