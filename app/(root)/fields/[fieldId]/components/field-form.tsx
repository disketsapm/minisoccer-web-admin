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
import { parse } from "path";

const formSchema = z.object({
  yardName: z.string().min(1, { message: "Title is required" }),
  yardCapacity: z.string().min(1, { message: "Capacity is required" }),
  yardSize: z.string().min(1, { message: "Size is required" }),
  yardFacilities: z.array(z.number()).min(1, { message: "Facilities is required" }),
  yardLocationUrl: z.string().min(1, { message: "Location is required" })
});

type FieldFormValues = z.infer<typeof formSchema>;

export const FieldForm = ({ data }: any) => {
  const router = useRouter();
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
  console.log(form.watch());

  const items = [
    { iconId: 1, name: "Mini Soccer Court" },
    { iconId: 2, name: "Toilet" },
    { iconId: 3, name: "Musala" },
    { iconId: 4, name: "Shower Room" }
  ];

  const onSubmit = async (dataForm: FieldFormValues) => {
    console.log(dataForm);
    const transformData = {
      ...dataForm,
      yardFacilities: dataForm.yardFacilities.map((facility) => {
        return items.find((item) => item.iconId === facility);
      })
    };
    console.log(transformData);
    if (data) {
      await updateField({ _id: data._id, ...transformData });
    } else {
      await createField(transformData);
    }
  };

  useEffect(() => {
    form.setValue("yardName", data?.yardName || "");
    form.setValue("yardCapacity", data?.yardCapacity.toString() || "");
    form.setValue("yardSize", data?.yardSize || "");
    form.setValue(
      "yardFacilities",
      data?.yardFacilities?.map((facility: any) => parseInt(facility.iconId))
    );
    form.setValue("yardLocationUrl", data?.yardLocationUrl || "");
  }, [data]);

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
                      <FormItem
                        key={item.iconId} // Change key to iconId
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={form.watch().yardFacilities?.includes(item.iconId)} // Check for item.iconId
                            onCheckedChange={(checked) => {
                              const currentFacilities = form.getValues().yardFacilities || [];
                              const updatedFacilities = checked
                                ? [...currentFacilities, item.iconId] // Update with item.iconId
                                : currentFacilities.filter((value) => value !== item.iconId); // Update with item.iconId
                              form.setValue("yardFacilities", updatedFacilities);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.name}</FormLabel>
                      </FormItem>
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
