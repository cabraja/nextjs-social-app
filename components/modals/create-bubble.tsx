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

import useModal from "@/hooks/use-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BubbleAccessType } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum of 2 characters." })
    .max(24, { message: "Maximum of 24 characters." }),
  description: z.string().min(10),
  accessType: z.nativeEnum(BubbleAccessType),
});

function CreateBubbleModal() {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "createBubble";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      accessType: BubbleAccessType.PUBLIC,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
          <DialogTitle>Create a Bubble</DialogTitle>
          <DialogDescription>
            Create a community of your own to discuss your interests.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bubble Name</FormLabel>
                    <FormControl>
                      <Input className="text-sm" placeholder="Enter a name" />
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
                    <FormLabel>Access type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={BubbleAccessType.PUBLIC} />
                          </FormControl>
                          <FormLabel className="font-normal">Anyone</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={BubbleAccessType.PRIVATE} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Only users approved by owner or moderators.
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Who can make posts in your bubble?
                    </FormDescription>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBubbleModal;
