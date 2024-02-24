"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useModal from "@/hooks/use-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosReponse } from "@/types/axios";
import { PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "You must enter a title." })
    .max(24, { message: "Maximum of 40 characters." }),
  textContent: z
    .string()
    .min(2, { message: "Your content must have a minimum of 2 charachters." }),
  codeContent: z.string().max(5000).optional(),
});

function CreatePostModal() {
  const [disabled, setDisabled] = useState(false);
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "createPost";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      textContent: "",
      codeContent: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setDisabled(true);
    console.log(values);
    setDisabled(false);
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
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <PlusCircle className="w-6 h-6" />
            Create a New Post
          </DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white text-black">
                      Post Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        {...field}
                        placeholder="Give your post a title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="textContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white text-black">
                      Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm"
                        {...field}
                        placeholder="Write your thoughts here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white text-black">
                      Code
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        placeholder="Insert your code here (optional)"
                      />
                    </FormControl>

                    {field.value && (
                      <div className="theme-agate mt-8">
                        <Label>Preview</Label>
                        <SyntaxHighlighter
                          language="javascript"
                          style={atomOneDark}
                          wrapLongLines={true}
                          customStyle={{
                            maxHeight: "200px",
                            overflowY: "scroll",
                          }}
                        >
                          {field.value}
                        </SyntaxHighlighter>
                      </div>
                    )}
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

export default CreatePostModal;
