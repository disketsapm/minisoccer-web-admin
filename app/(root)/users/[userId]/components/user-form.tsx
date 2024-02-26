'use client';

import * as z from 'zod';
import { use, useEffect, useState } from 'react';
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
import { FaBackspace } from 'react-icons/fa';

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

export const UserForm = ({ data }: any) => {
  const router = useRouter();
  const { mutateAsync: addUser } = useAddUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [loading, setLoading] = useState(false);

  const description = data
    ? 'Perhatikan secara detail! Karena perubahan data akan memengaruhi akses pemilik akun.'
    : 'Buat akun untuk Admin, Kasir, maupun Customer.';
  const title = data ? 'Ubah Data Akun' : 'Buat Akun';
  const action = data ? 'Simpan perubahan' : 'Buat Akun';

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (data) {
      form.setValue('email', data.email);
      form.setValue('fullName', data.fullName);
      form.setValue('password', data.password);
      form.setValue('phoneNumber', data.phoneNumber);
      form.setValue('roles', data.roles);
    }
  }, [data]);

  const onSubmit = async (dataForm: UserFormValues) => {
    const { _id, ...payload } = dataForm;
    try {
      setLoading(true);
      if (data) {
        const payloadUpdate = {
          ...payload,
          _id: data._id,
        };
        updateUser(payloadUpdate);
      } else {
        addUser(payload);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <Button
          size={'default'}
          variant={'outline'}
          onClick={() => router.back()}
        >
          <FaBackspace className="mr-2" />
          Kembali
        </Button>
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
                      placeholder="Email"
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
                      placeholder="Kata Sandi"
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
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nama Lengkap"
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
                  <FormLabel>No. Telepon</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="No. Telepon"
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
                  <FormLabel>Jenis Akun</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Akun" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Cashier">Kasir</SelectItem>
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
