"use client";

import * as z from "zod";
import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Banner } from "@/interfaces/banner.interface";
import { useUploadImage } from "@/hooks/general/useUplodeImage";
import { useAddBanner } from "@/hooks/banner/useAddBanner";
import { useUpdateBanner } from "@/hooks/banner/useUpdateBanner";
import { useDeleteFile } from "@/hooks/general/useDeleteImage";
import ImageCropper from "@/components/shared/image-croping";
import { DialogCropImage } from "@/components/shared/dialog-crop-image";
import { fetchBlob } from "@/lib/utils";
import { FaBackspace } from "react-icons/fa";
import { useAddImageField } from "@/hooks/image-field/useAddImageField";
import { useUpdateImageField } from "@/hooks/image-field/useUpdateImageField";
import { useAddScheduleBoard } from "@/hooks/schedule/useAddScheduleBoard";
import Calendar from "@/app/(root)/fields/[fieldId]/(routes)/schedule/[scheduleId]/components/calendar";
import { useGetSchedule } from "@/hooks/schedule/useGetSchedule";

const formSchema = z.object({
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  weekday_price: z.array(
    z.object({
      session: z.string(),
      price: z.number()
    })
  ),
  weekend_price: z.array(
    z.object({
      session: z.string(),
      price: z.number()
    })
  )
});

type BannerFormValues = z.infer<typeof formSchema>;

export const ScheduleForm = ({ data }: any) => {
  const params = useParams();
  const {
    mutateAsync: generateSchedule,
    isPending: loadingGenerate,
    data: dataBoard
  } = useAddScheduleBoard();

  const { data: dataSchedule, refetch: refetchGetSchedule } = useGetSchedule({
    search: params.fieldId
  });
  console.log(dataSchedule);
  const router = useRouter();

  const title = "Generate Jadwal";
  const description = "Generate Jadwal untuk diupdate dan ditampilkan";

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema)
  });

  const {
    fields: weekDayFields,
    append,
    remove
  } = useFieldArray({
    control: form.control,
    name: "weekday_price"
  });

  const {
    fields: weekEndFields,
    append: appendWeekEnd,
    remove: removeWeekEnd
  } = useFieldArray({
    control: form.control,
    name: "weekend_price"
  });

  useEffect(() => {
    const sessions = Array(8)
      .fill(undefined)
      .map((_, index) => ({
        session: `${index + 1}`,
        price: 100000
      }));
    form.setValue("weekday_price", sessions);
    form.setValue("weekend_price", sessions);
  }, []);

  console.log(form.watch());
  const onSubmit = async (dataForm: BannerFormValues) => {
    await generateSchedule({
      venue_id: params.fieldId,
      ...dataForm
    });
    refetchGetSchedule();
  };

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <Button
          size={"default"}
          variant={"outline"}
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
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Mulai</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukan Tanggal Mulai"
                      {...field}
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Selesai</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukan Tanggal Selesai"
                      {...field}
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormLabel>Harga Hari Biasa</FormLabel>
              {weekDayFields.map((field, index) => (
                <div key={field.id}>
                  <FormField
                    control={form.control}
                    name={`weekday_price[${index}].price` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sesi {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukan Harga"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <FormLabel>Harga Hari Libur / Akhir Pekan </FormLabel>
              {weekEndFields.map((field, index) => (
                <div key={field.id}>
                  <FormField
                    control={form.control}
                    name={`weekend_price[${index}].price` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sesi {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukan Harga"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <Button
              className="float-right"
              size={"lg"}
              type="submit"
            >
              Generate
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      <div className="mt-10 w-[1000px]">
        <Calendar events={dataSchedule?.data ?? []} />
      </div>
    </>
  );
};
