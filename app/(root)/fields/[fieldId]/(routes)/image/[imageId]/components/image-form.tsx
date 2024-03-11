'use client';

import * as z from 'zod';
import { use, useEffect, useState } from 'react';
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
import { fetchBlob } from '@/lib/utils';
import { FaBackspace } from 'react-icons/fa';

const formSchema = z.object({
  image_desktop: z.string().min(1, { message: 'Image is required' }),
  imageDesktop: z.custom((value) => {
    if (value) {
      return true;
    }
    return 'Image is required';
  }),
});

type BannerFormValues = z.infer<typeof formSchema>;

export const ImageForm = ({ data }: any) => {
  console.log(data);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeImage, setTypeImage] = useState('desktop');
  const [cropImage, setCropImage] = useState({
    desktop: null,
    mobile: null,
  });

  const title = data ? 'Edit Gambar' : 'Buat Gambar';
  const description = data ? 'Edit Gambar ini untuk diupdate dan ditampilkan' : 'Buat Gambar baru untuk ditampilkan ';
  const toastMessage = data ? 'Gambar updated.' : 'Gambar created.';
  const action = data ? 'Simpan Perubahan' : 'Buat Gambar';

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: uploadFile, isPending: loadingUpload } = useUploadImage();
  const { mutateAsync: createBanner, isPending: loadingCreate } = useAddBanner();
  const { mutateAsync: updateBanner, isPending: loadingUpdate } = useUpdateBanner();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const imageDesktop = form.watch('imageDesktop');

  const onSubmit = async (dataForm: BannerFormValues) => {
    try {
      let uploadedImageUrlDesktop = null;

      if (cropImage.desktop) {
        const imageBlobDesktop = await fetchBlob(cropImage.desktop);
        const uploadedImageDesktop = await uploadFile({
          file: imageBlobDesktop,
        });
        uploadedImageUrlDesktop = uploadedImageDesktop.data.file_url;
      }

      const bannerData = {
        image_desktop: dataForm.imageDesktop ? uploadedImageUrlDesktop : data ? data.image_desktop : imageDesktop?.data?.file_url,
      };
      if (data) {
        if (data.image_desktop !== bannerData.image_desktop) {
          const parts = data.image_desktop.split('/');
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
    form.setValue('image_desktop', data?.image_desktop || '');
  }, [data]);

  useEffect(() => {
    form.setValue('image_desktop', cropImage?.desktop || data?.image_desktop || '');
  }, [cropImage]);

  const imageUrlDekstop = imageDesktop ? URL.createObjectURL(imageDesktop) : null;
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
          className="space-y-8 md:w-[70vw] w-full"
        >
          <div className="md:grid md:grid-cols-2 gap-8 ">
            <DialogCropImage
              open={open}
              onOpenChange={setOpen}
              imageUrl={typeImage === 'desktop' ? imageUrlDekstop : null}
              setCropComplete={setCropImage}
              typeImage={typeImage}
            />

            <FormField
              control={form.control}
              name="imageDesktop"
              render={({ field }) => {
                const src = cropImage.desktop ? cropImage.desktop : imageDesktop ? URL.createObjectURL(imageDesktop) : data?.image_desktop;
                return (
                  <FormItem>
                    <FormLabel>Unggah Banner Desktop</FormLabel>

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
                    <FormDescription>Upload banner dengan ratio 1920x1080 atau ratio 16:9</FormDescription>
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
