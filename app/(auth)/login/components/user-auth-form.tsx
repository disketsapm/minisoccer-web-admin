"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().refine((value) => !!value.trim(), {
    message: "Email is required"
  }),
  password: z.string().refine((value) => !!value.trim(), {
    message: "Password is required"
  })
});

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    login(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="@mail"
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

        <Button
          className="px-10 w-full"
          type="submit"
          disabled={isPending}
          isLoading={isPending}
        >
          Login
        </Button>

        <div className="flex items-center my-4">
          <div className="border-b flex-1 mr-4"></div>
          <span className="text-gray-500 text-sm">Or sign in with</span>
          <div className="border-b flex-1 ml-4"></div>
        </div>

        <div className="flex justify-between gap-x-5">
          <Button
            className=" w-full"
            variant="secondary"
            type="button"
            onClick={() =>
              (window.location.href = "https://api-stg.soccerchief.co/auth/google?role=Admin")
            }
          >
            <FaGoogle className="mr-2" /> Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
