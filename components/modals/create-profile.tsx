"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must contain at least 4 characters." })
    .max(24, { message: "Username must not exceed 24 characters." })
    .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9]))*[a-zA-Z0-9]$/, {
      message:
        "Can only contain letters, numbers and dashes (No dashes at the start or the end).",
    }),
});

function CreateProfile() {
  const [disabled, setDisabled] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true);
    try {
      await axios.post("/api/profile", {
        user: user,
        username: values.username,
      });
      toast.success("Success! Redirecting to homepage...");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-fit bg-slate-50">
        <CardHeader className="dark:text-primary-foreground">
          <CardTitle className="text-xl font-bold">
            Choose a new username
          </CardTitle>
          <CardDescription className="dark:text-neutral-500">
            In order to complete your profile, you need to choose a suitable
            username.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:bg-transparent border-neutral-300 text-primary-foreground"
                        placeholder="Enter a username"
                        data-lpignore="true"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button onClick={() => signOut()}>Cancel</Button>
                <Button disabled={disabled} variant="outline">
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateProfile;
