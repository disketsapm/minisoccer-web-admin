'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { Banner } from '@/interfaces/banner.interface';
import { useUploadImage } from '@/hooks/general/useUplodeImage';
import { useAddBanner } from '@/hooks/banner/useAddBanner';
import { useUpdateBanner } from '@/hooks/banner/useUpdateBanner';
import { useDeleteFile } from '@/hooks/general/useDeleteImage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  ctaUrl: z.string().url().min(1, { message: 'CTA Url is required' }),
  deviceType: z.string().min(1, { message: 'Device Type is required' }),
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
  data?: Banner;
}

export const BannerForm: React.FC<BannerFormProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = data ? 'Edit banner' : 'Create banner';
  const description = data ? 'Edit a banner.' : 'Add a new banner';
  const toastMessage = data ? 'banner updated.' : 'banner created.';
  const action = data ? 'Save changes' : 'Create';

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      image: data?.image || '',
      type: data?.type || '',
      deviceType: data?.deviceType || '',
      ctaUrl: data?.ctaUrl || '',
      availableAt: data?.availableAt ? new Date(data?.availableAt as string)?.toISOString().split('T')[0] : '',
      availableUntil: data?.availableUntil ? new Date(data?.availableUntil as string)?.toISOString().split('T')[0] : '',
      imageFile: null,
    },
  });

  const { mutateAsync: uploadFile, isPending: loadingUpload } = useUploadImage();
  const { mutateAsync: createBanner, isPending: loadingCreate } = useAddBanner();
  const { mutateAsync: updateBanner, isPending: loadingUpdate } = useUpdateBanner();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const image = form.watch('imageFile');

  const onSubmit = async (dataForm: BannerFormValues) => {
    try {
      let uploadedImageUrl = null;
      if (dataForm.imageFile) {
        const uploadedImage = await uploadFile({ file: dataForm.imageFile, type: 'Homepage' });
        uploadedImageUrl = uploadedImage.data.file_url;
      }

      const bannerData = {
        title: dataForm.title,
        description: dataForm.description,
        type: dataForm.type,
        availableAt: dataForm.availableAt,
        availableUntil: dataForm.availableUntil,
        ctaUrl: dataForm.ctaUrl,
        deviceType: dataForm.deviceType,
        image: dataForm.imageFile ? uploadedImageUrl : data ? data.image : image?.data?.file_url,
      };
      if (data) {
        console.log(bannerData.image, data.image);
        if (data.image !== bannerData.image) {
          const parts = data.image.split('/');
          const filename = parts[parts.length - 1];
          await deleteFile({ filename: filename });
        }
        await updateBanner({ ...bannerData, _id: data._id });
      } else {
        await createBanner(bannerData);
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/banners`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setValue('image', image?.name || data?.image);
  }, [image]);

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
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="itle"
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
                  <FormLabel>Description</FormLabel>
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
                  <FormLabel>Available At</FormLabel>
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
                  <FormLabel>Available Until</FormLabel>
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
              name="deviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Dekstop">Dekstop</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                  <FormDescription>example: https://www.example.com</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => {
                const src = image ? URL.createObjectURL(image) : data?.image;
                return (
                  <FormItem>
                    <FormLabel>Upload Banner</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="description"
                        type="file"
                        defaultValue={field.value}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        ref={field.ref}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                    <Image
                      src={src ?? 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'} // Create a temporary URL for the Blob
                      alt="Uploaded Image"
                      width={300}
                      height={300}
                    />
                    <FormMessage>{form.formState.errors.image?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>
          <Button
            disabled={loadingCreate || loadingUpdate}
            className="float-right"
            size={'lg'}
            type="submit"
          >
            {loadingUpload ? 'Uploading...' : loadingCreate || loadingUpdate ? 'Loading...' : action}
          </Button>
        </form>
      </Form>
    </>
  );
};
