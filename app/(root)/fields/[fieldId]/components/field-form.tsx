"use client";

import * as z from "zod";
import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useAddField } from "@/hooks/field/useAddField";
import { useUpdateField } from "@/hooks/field/useUpdateField";
import { FaBackspace } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  yardName: z.string().min(1, { message: "Title is required" }),
  yardDesc: z.string().min(1, { message: "Description is required" }),
  yardCapacity: z.string().min(1, { message: "Capacity is required" }),
  yardSize: z.string().min(1, { message: "Size is required" }),
  yardFacilities: z.array(z.string()).min(1, { message: "Facilities is required" }),
  yardLocationUrl: z.string().min(1, { message: "Location is required" }),
  assets: z
    .array(
      z.object({
        image: z.string().min(1, { message: "Image is required" }),
        heroImage: z.string().min(1, { message: "Hero Image is required" }),
        showcase: z.string().min(1, { message: "Showcase is required" })
      })
    )
    .optional()
});

type FieldFormValues = z.infer<typeof formSchema>;

export const FieldForm = ({ data }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = data ? "Edit Lapang" : "Buat Lapang";
  const description = data
    ? "Edit Lapang ini untuk diupdate dan ditampilkan"
    : "Buat Lapang baru untuk ditampilkan ";
  const toastMessage = data ? "Lapang updated." : "Lapang created.";
  const action = data ? "Simpan Perubahan" : "Buat Lapang";

  const form = useForm<FieldFormValues>({
    resolver: zodResolver(formSchema)
  });

  const { mutateAsync: createField, isPending: loadingCreate } = useAddField();
  const { mutateAsync: updateField, isPending: loadingUpdate } = useUpdateField();

  const onSubmit = async (dataForm: FieldFormValues) => {
    if (data) {
      await updateField({ _id: data._id, ...dataForm });
    } else {
      await createField(dataForm);
    }
  };

  useEffect(() => {
    form.setValue("yardName", data?.yardName || "");
    form.setValue("yardDesc", data?.yardDesc || "");
    form.setValue("yardCapacity", data?.yardCapacity.toString() || "");
    form.setValue("yardSize", data?.yardSize.toString() || "");
    form.setValue("yardFacilities", data?.yardFacilities || []);
    form.setValue("yardLocationUrl", data?.yardLocationUrl || "");
    form.setValue("assets", data?.assets || []);
  }, [data]);

  const items = [
    { label: "Mini Soccer Court" },
    { label: "Toilet" },
    { label: "Musala" },
    { label: "Shower Room" }
  ];

  console.log(form.watch());

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
              name="yardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lapang</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Masukan Judul Field"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yardDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Lapang</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Masukan Judul Field"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yardCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kapasitas Lapang</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Masukan Judul Field"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yardSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ukuran Lapang</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Masukan Judul Field"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yardLocationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi URL Lapang</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Masukan Judul Field"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yardFacilities"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Fasilitas Lapang</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {items.map((item) => (
                      <FormField
                        key={item.label}
                        control={form.control}
                        name="yardFacilities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.label}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={form.watch().yardFacilities?.includes(item.label)}
                                  onCheckedChange={(checked) => {
                                    const currentFacilities = form.getValues().yardFacilities || [];
                                    const updatedFacilities = checked
                                      ? [...currentFacilities, item.label]
                                      : currentFacilities.filter((value) => value !== item.label);
                                    form.setValue("yardFacilities", updatedFacilities);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loadingCreate || loadingUpdate}
            className="float-right"
            size={"lg"}
            type="submit"
          >
            {loadingCreate || loadingUpdate ? "Loading..." : action}
          </Button>
        </form>
      </Form>
    </>
  );
};
