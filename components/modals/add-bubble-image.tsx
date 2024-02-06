"use client";
import React, { useState } from "react";
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
import { X } from "lucide-react";

function AddBubbleImageModal() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "addBubbleImage";

  const handleClose = () => {
    onClose();
  };

  const handleUploadComplete = async (res: any) => {
    setFileUrl(res[0].url);
    try {
      // ADD IMAGE
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api/uploadthing", {
        data: {
          url: fileUrl,
        },
      });
      setFileUrl(null);
    } catch (error) {
      console.log("NOPE");
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Change Bubble Image</DialogTitle>
          <DialogDescription>
            Give your bubble some personality! Add a picture by clicking below.
          </DialogDescription>
        </DialogHeader>

        {fileUrl && (
          <div className="w-4/5 aspect-square mx-auto">
            <div className="w-full aspect-square h-full rounded-full bg-slate-500 relative">
              <Image
                className="w-full h-full rounded-full object-cover"
                src={fileUrl}
                fill={true}
                alt="New Image Preview"
              />

              <div
                onClick={() => handleDelete()}
                className="absolute bg-red-700 rounded-full p-2 top-1 right-2 hover:opacity-80 transition cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </div>
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
      </DialogContent>
    </Dialog>
  );
}

export default AddBubbleImageModal;
