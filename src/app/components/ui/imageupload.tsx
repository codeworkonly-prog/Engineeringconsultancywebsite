import { useState } from "react";
import { toast } from "sonner";
import { UploadCloud, X, Loader2 } from "lucide-react";

import { uploadImage } from "../../../cloudinary";
import { Label } from "./label";
import { Button } from "./button";

type ImageUploadProps = {
  label?: string;
  value?: string;
  folder?: string;
  disabled?: boolean;
  onChange: (url: string) => void;
};

export function ImageUpload({
  label = "Image",
  value,
  folder = "uploads",
  disabled,
  onChange,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5MB");
      return;
    }

    try {
      setUploading(true);
      setFileName(file.name);

      const url = await uploadImage(file, folder);

      onChange(url);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
      setFileName("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      <label
        className={`
          flex cursor-pointer flex-col items-center justify-center
          rounded-xl border-2 border-dashed p-6 text-center
          transition-colors
          ${
            disabled || uploading
              ? "cursor-not-allowed opacity-60"
              : "hover:border-primary hover:bg-muted/40"
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled || uploading}
          onChange={handleUpload}
        />

        {uploading ? (
          <>
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
            <p className="font-medium">Uploading image...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </>
        ) : (
          <>
            <UploadCloud className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium">Click to upload an image</p>
          </>
        )}
      </label>

      {fileName && (
        <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
          <span className="truncate text-sm">{fileName}</span>

          {value && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={disabled || uploading}
              onClick={() => {
                onChange("");
                setFileName("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
