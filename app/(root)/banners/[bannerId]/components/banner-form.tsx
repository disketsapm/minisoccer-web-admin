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
import ImageCropper from '@/components/shared/image-croping';
import { DialogCropImage } from '@/components/shared/dialog-crop-image';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image_desktop: z.string().min(1, { message: 'Image is required' }),
  image_mobile: z.string().min(1, { message: 'Image is required' }),
  ctaUrl: z.string().url().min(1, { message: 'CTA Url is required' }),
  imageDesktop: z.custom((value) => {
    if (value) {
      return true;
    }
    return 'Image is required';
  }),
  imageMobile: z.custom((value) => {
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeImage, setTypeImage] = useState('desktop');
  const [cropImage, setCropImage] = useState({
    desktop: null,
    mobile: null,
  });

  const title = data ? 'Edit banner' : 'Create banner';
  const description = data ? 'Edit a banner.' : 'Add a new banner';
  const toastMessage = data ? 'banner updated.' : 'banner created.';
  const action = data ? 'Save changes' : 'Create';

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      image_desktop: data?.image_desktop || '',
      image_mobile: data?.image_mobile || '',
      ctaUrl: data?.ctaUrl || '',
      imageDesktop: null,
      imageMobile: null,
    },
  });

  const { mutateAsync: uploadFile, isPending: loadingUpload } = useUploadImage();
  const { mutateAsync: createBanner, isPending: loadingCreate } = useAddBanner();
  const { mutateAsync: updateBanner, isPending: loadingUpdate } = useUpdateBanner();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const imageDesktop = form.watch('imageDesktop');
  const imageMobile = form.watch('imageMobile');

  const onSubmit = async (dataForm: BannerFormValues) => {
    console.log(dataForm);
    try {
      let uploadedImageUrlDesktop = null;
      let uploadedImageUrlMobile = null;
      if (dataForm.imageDesktop) {
        const uploadedImageDesktop = await uploadFile({
          file: dataForm.imageDesktop,
          type: 'Homepage',
        });

        uploadedImageUrlDesktop = uploadedImageDesktop.data.file_url;
      }
      if (dataForm.imageMobile) {
        const uploadedImageMobile = await uploadFile({
          file: dataForm.imageMobile,
          type: 'Homepage',
        });
        uploadedImageUrlMobile = uploadedImageMobile.data.file_url;
      }

      const bannerData = {
        title: dataForm.title,
        description: dataForm.description,
        ctaUrl: dataForm.ctaUrl,
        image_mobile: dataForm.imageMobile ? uploadedImageUrlMobile : data ? data.image_mobile : imageMobile?.data?.file_url,
        image_desktop: dataForm.imageDesktop ? uploadedImageUrlDesktop : data ? data.image_desktop : imageDesktop?.data?.file_url,
      };
      if (data) {
        if (data.image_desktop !== bannerData.image_desktop) {
          const parts = data.image_desktop.split('/');
          const filename = parts[parts.length - 1];
          await deleteFile({ filename: filename });
        }
        if (data.image_mobile !== bannerData.image_mobile) {
          const parts = data.image_mobile.split('/');
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
    form.setValue('image_desktop', cropImage?.desktop || data?.image_desktop || '');
    form.setValue('image_mobile', cropImage.mobile || data?.image_mobile || '');
  }, [data, cropImage]);

  const imageUrlDekstop = imageDesktop ? URL.createObjectURL(imageDesktop) : null;
  const imageUrlMobile = imageMobile ? URL.createObjectURL(imageMobile) : null;
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
            <DialogCropImage
              open={open}
              onOpenChange={setOpen}
              imageUrl={typeImage === 'desktop' ? imageUrlDekstop : imageUrlMobile}
              setCropComplete={setCropImage}
              typeImage={typeImage}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Title</FormLabel>
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
              name="imageDesktop"
              render={({ field }) => {
                const src = cropImage.desktop ? cropImage.desktop : imageDesktop ? URL.createObjectURL(imageDesktop) : data?.image_desktop;
                return (
                  <FormItem>
                    <FormLabel>Upload Banner Desktop</FormLabel>

                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="description"
                        type="file"
                        defaultValue={field.value}
                        onChange={(e) => {
                          setTypeImage('desktop');
                          setOpen(true);
                          field.onChange(e.target.files?.[0]);
                        }}
                        ref={field.ref}
                        name={field.name}
                      />
                    </FormControl>
                    <FormDescription>Recommended size: 16 x 9 </FormDescription>
                    <FormMessage />
                    <Image
                      src={src ?? 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'} // Create a temporary URL for the Blob
                      alt="Uploaded Image"
                      width={300}
                      height={300}
                    />
                    <FormMessage>{form.formState.errors.image_desktop?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="imageMobile"
              render={({ field }) => {
                const src = cropImage.mobile ? cropImage.mobile : imageMobile ? URL.createObjectURL(imageMobile) : data?.image_mobile;
                return (
                  <FormItem>
                    <FormLabel>Upload Banner Mobile</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="description"
                        type="file"
                        defaultValue={field.value}
                        onChange={(e) => {
                          setTypeImage('mobile');
                          setOpen(true);
                          field.onChange(e.target.files?.[0]);
                        }}
                        ref={field.ref}
                        name={field.name}
                      />
                    </FormControl>
                    <FormDescription>Recommended size: 4 x 5 </FormDescription>
                    <FormMessage />
                    <Image
                      src={src ?? 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'} // Create a temporary URL for the Blob
                      alt="Uploaded Image"
                      width={300}
                      height={300}
                    />
                    <FormMessage>{form.formState.errors.image_mobile?.message}</FormMessage>
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
