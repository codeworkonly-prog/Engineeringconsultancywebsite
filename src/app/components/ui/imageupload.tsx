import { useState } from "react";
import { toast } from "sonner";
import { uploadImage } from "../../../cloudinary";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { X } from "lucide-react";

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

      const url = await uploadImage(file, folder);

      onChange(url);

      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      <Input
        type="file"
        accept="image/*"
        disabled={disabled || uploading}
        onChange={handleUpload}
      />

      {uploading && (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      )}
      {value && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => onChange("")}
        >
          <X className="mr-2 h-4 w-4" />
          Remove Image
        </Button>
      )}
    </div>
  );
}
