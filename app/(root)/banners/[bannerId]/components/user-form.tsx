'use client';

import * as z from 'zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useAddUser } from '@/hooks/user/useAddUser';
import { Banner } from '@/interfaces/banner.interface';
import { useUploadImage } from '@/hooks/general/useUplodeImage';
import { useAddBanner } from '@/hooks/banner/useAddBanner';
// import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  ctaUrl: z.string().min(1, { message: 'CTA Url is required' }),
  availableAt: z.string().min(1, { message: 'Available At is required' }),
  availableUntil: z.string().min(1, { message: 'Available Until is required' }),
  imageFile: z.custom((value) => {
    if (value) {
      return true;
    }
    return 'Image is required';
  }),
});

type BannerFormValues = z.infer<typeof formSchema>;

interface BannerFormProps {
  initialData: Banner | null;
}

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit User' : 'Create User';
  const description = initialData ? 'Edit a User.' : 'Add a new User';
  const toastMessage = initialData ? 'User updated.' : 'User created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      image: '',
      type: '',
      ctaUrl: '',
      availableAt: '',
      availableUntil: '',
    },
  });

  const { mutateAsync: uploadFile } = useUploadImage();
  const { mutateAsync: createBanner } = useAddBanner();

  const image = form.watch('imageFile');
  console.log(form.watch());

  const onSubmit = async (data: BannerFormValues) => {
    try {
      let uploadedImageUrl = null;
      if (data.imageFile) {
        const uploadedImage = await uploadFile({ file: data.imageFile, type: 'Homepage' });
        uploadedImageUrl = uploadedImage.data.file_url;
      }

      const bannerData = {
        title: data.title,
        description: data.description,
        type: data.type,
        availableAt: data.availableAt,
        availableUntil: data.availableUntil,
        ctaUrl: data.ctaUrl,
        image: data.imageFile ? uploadedImageUrl : initialData ? initialData.image : image?.data?.file_url,
      };

      createBanner(bannerData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setValue('image', image?.name || '');
  }, [image]);

  console.log(form.watch());

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
          className="space-y-8 md:w-[70vw] w-full"
        >
          <div className="md:grid md:grid-cols-2 gap-8 ">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="type"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="type"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Banner</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="description"
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      ref={field.ref}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)} // Create a temporary URL for the Blob
                      alt="Uploaded Image"
                      style={{ maxWidth: '100%', maxHeight: '300px' }} // Set max width and height
                    />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ctaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> CTA URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
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
