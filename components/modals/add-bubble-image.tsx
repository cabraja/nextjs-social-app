"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useModal from "@/hooks/use-modal";
import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function AddBubbleImageModal() {
  const { isOpen, type, onClose, data } = useModal();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const isModalOpen =
    isOpen && (type === "addBubbleImage" || type === "addBubbleCover");

  useEffect(() => {
    if (data.fileUrl && isModalOpen) setFileUrl(data.fileUrl);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleUploadComplete = async (res: any) => {
    setFileUrl(res[0].url);
  };

  const handleDelete = async () => {
    const url =
      type === "addBubbleImage"
        ? "/api/bubbles/images/main"
        : "/api/bubbles/images/cover";
    try {
      setFileUrl(null);
      await axios.patch(url, {
        fileUrl: null,
        bubbleId: data.bubbleId,
      });
      await axios.delete("/api/uploadthing", {
        data: {
          url: fileUrl,
        },
      });
      router.refresh();
      toast.success("Image deleted.");
      setIsConfirmed(false);
    } catch (error) {
      setIsConfirmed(false);
      toast.error("Error occured.");
    }
  };

  const handleConfirm = async () => {
    setIsConfirmed(true);
    const url =
      type === "addBubbleImage"
        ? "/api/bubbles/images/main"
        : "/api/bubbles/images/cover";

    try {
      await axios.patch(url, {
        fileUrl: fileUrl,
        bubbleId: data.bubbleId,
      });
      onClose();
      toast.success("Success!");
      router.refresh();
      setIsConfirmed(false);
    } catch (error) {
      setIsConfirmed(false);
      toast.error("Error occured.");
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            Change Bubble {type === "addBubbleCover" ? "Cover" : ""} Image
          </DialogTitle>
          <DialogDescription>
            Give your bubble some personality! Add a picture by clicking below.
          </DialogDescription>
        </DialogHeader>

        {fileUrl && (
          <div className="w-4/5 aspect-square mx-auto">
            <div className="w-full aspect-square h-full rounded-full bg-slate-500 relative">
              {!isConfirmed && (
                <Image
                  className="w-full h-full rounded-full object-cover"
                  src={fileUrl}
                  fill={true}
                  sizes="(min-width: 1px) 90vw"
                  alt="New Image Preview"
                />
              )}

              {isConfirmed && (
                <div className="h-full w-full rounded-full flex items-center justify-center animate-spin">
                  <Loader2 className="w-10 h-10" />
                </div>
              )}
            </div>
          </div>
        )}

        {!fileUrl && (
          <div>
            <UploadButton
              className="ut-button:bg-blue-500"
              endpoint="bubbleImage"
              onClientUploadComplete={(res) => handleUploadComplete(res)}
              onUploadError={(error: Error) => {
                toast.error("Image upload failed.");
              }}
            />
          </div>
        )}

        {fileUrl && (
          <div className="flex md:flex-row flex-col gap-x-3">
            <Button
              disabled={isConfirmed}
              onClick={() => handleConfirm()}
              className="flex-1"
              type="button"
            >
              Confirm
            </Button>
            <Button
              disabled={isConfirmed}
              onClick={() => handleDelete()}
              className="flex-1"
              variant="destructive"
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddBubbleImageModal;
