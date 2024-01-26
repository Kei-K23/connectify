import { UploadButton } from "@/lib/uploadthing";
import { ImageIcon, Loader2Icon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadBtnProps {
  imageUrl: string;
  defaultImageUrl?: string;
  setImageUrl: (imageUrl: string) => void;
  setIsImageUploading: (value: boolean) => void;
}

const ImageUploadBtn = ({
  imageUrl,
  setImageUrl,
  setIsImageUploading,
  defaultImageUrl,
}: ImageUploadBtnProps) => {
  const image = imageUrl || defaultImageUrl;

  if (image) {
    return (
      <div className="relative mt-4 h-[250px] w-full rounded-lg">
        <Image src={image} alt="post image" className="rounded-lg" fill />
        <Button
          className="absolute right-1 top-1 rounded-full bg-black/70 px-2.5 text-white hover:bg-black/50"
          onClick={() => setImageUrl("")}
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  if (!image) {
    return (
      <UploadButton
        content={{
          button({ ready, isUploading }) {
            if (ready) {
              return <ImageIcon className="h-5 w-5" />;
            }
            if (isUploading) {
              return <Loader2Icon className="h-5 w-5 animate-spin" />;
            }
            return <Loader2Icon className="h-5 w-5 animate-spin" />;
          },
        }}
        appearance={{
          button: {
            width: "40px",
            height: "30px",
            marginRight: "auto",
            marginTop: "0.7rem",
          },
          allowedContent: {
            display: "none",
          },
        }}
        endpoint="imageUploader"
        onUploadBegin={() => setIsImageUploading(true)}
        onClientUploadComplete={(res) => {
          setIsImageUploading(false);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error("Try again! Could not upload image.");
        }}
      />
    );
  }
};

export default ImageUploadBtn;
