import { UploadButton } from "@/lib/uploadthing";
import { ImageIcon, Loader2Icon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface ImageUploadBtnProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

const ImageUploadBtn = ({ imageUrl, setImageUrl }: ImageUploadBtnProps) => {
  if (imageUrl) {
    return (
      <div className="relative w-full h-[250px] rounded-lg mt-4">
        <Image src={imageUrl} alt="post image" className="rounded-lg" fill />
        <Button
          className="absolute top-1 right-1 rounded-full px-2.5 bg-black/70 hover:bg-black/50 text-white"
          onClick={() => setImageUrl("")}
        >
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <UploadButton
        content={{
          button({ ready, isUploading }) {
            if (ready) {
              return <ImageIcon className="w-5 h-5" />;
            }
            if (isUploading) {
              return <Loader2Icon className="w-5 h-5 animate-spin" />;
            }
            return <Loader2Icon className="w-5 h-5 animate-spin" />;
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
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    );
  }
};

export default ImageUploadBtn;
