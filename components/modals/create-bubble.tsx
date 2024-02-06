"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import icon from "@/public/img/bubble2-svg.svg";

import useModal from "@/hooks/use-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Bubble, BubbleAccessType } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AxiosReponse } from "@/types/axios";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum of 2 characters." })
    .max(24, { message: "Maximum of 24 characters." }),
  description: z.string().min(10),
  accessType: z.nativeEnum(BubbleAccessType),
});

function CreateBubbleModal() {
  const [disabled, setDisabled] = useState(false);
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "createBubble";
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      accessType: BubbleAccessType.PUBLIC,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loadingToast = toast.loading("Loading...");
    setDisabled(true);
    try {
      const response: AxiosReponse<Bubble> = await axios.post(
        "/api/bubbles",
        values
      );
      setDisabled(true);
      router.push(`/b/${response.data.id}`);
      onClose();
      toast.dismiss(loadingToast);
      toast.success("Success! Redirecting...");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.response.data);
    } finally {
      setDisabled(false);
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <Image src={icon} alt="Bubbles2" width={30} height={30} />
            Create a Bubble
          </DialogTitle>
          <DialogDescription>
            Create a community of your own to discuss your interests. First,
            enter some basic information and after that you can edit the
            details.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white text-black">
                      Bubble Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        {...field}
                        placeholder="What will your bubble be called?"
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
                    <FormLabel className="dark:text-white text-black">
                      Description{" "}
                      <span className="text-xs text-zinc-400">
                        (you can always edit this later)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm"
                        {...field}
                        placeholder="What is your bubble about?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="my-5"></div>
              <FormField
                control={form.control}
                name="accessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Who can make posts in your bubble?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={BubbleAccessType.PUBLIC} />
                          </FormControl>
                          <FormLabel className="font-normal text-zinc-400">
                            Anyone
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={BubbleAccessType.PRIVATE} />
                          </FormControl>
                          <FormLabel className="font-normal text-zinc-400">
                            Only users approved by owner or moderators.
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button disabled={disabled} type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBubbleModal;
