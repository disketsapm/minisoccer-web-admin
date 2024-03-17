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
import Calendar from "@/app/(root)/fields/[fieldId]/(routes)/schedule/[scheduleId]/components/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUpdateSchedule } from "@/hooks/schedule/useUpdateSchedule";

const formSchema = z.object({
  price: z.number().min(1, { message: "Price is required" }),
  status: z.string().min(1, { message: "Status is required" })
});

type BannerFormValues = z.infer<typeof formSchema>;

export const ActionDateForm = ({ data }: any) => {
  const { mutateAsync: updateSchedule } = useUpdateSchedule();
  const params = useParams();
  console.log(params);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (data) {
      form.setValue("price", data?.extendedProps?.price);
      form.setValue("status", data?.title);
    }
  }, [data]);

  console.log(form.watch());
  const onSubmit = async (dataForm: BannerFormValues) => {
    console.log(dataForm);

    updateSchedule({
      _id: data?.extendedProps?.idSession,
      price: dataForm.price.toString(),
      status: dataForm.status
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukan Harga"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                console.log(field),
                (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={data ? data.title : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified status to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Unavailable">Unavailable</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              )}
            />
            <Button
              className="float-right w-[150px] self-end"
              size={"lg"}
              type="submit"
            >
              Update Jadwal
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
