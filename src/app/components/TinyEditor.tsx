import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({ value, onChange }: any) {
  return (
    <Editor
      apiKey="azhcdltlfnuv5kyngqybhn5j6fn570y098qnqoju2s27j27n"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 400,
        menubar: true,
        image_caption: true,
        image_title: true,
        image_advtab: false,
        image_uploadtab: true,
        valid_elements: "*[*]",

        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],

        toolbar:
          "undo redo | formatselect | bold italic underline | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist | link image media | " +
          "code preview fullscreen",

        content_style: `
          .tox-dialog__body-content input[name="src"],
          .tox-dialog__body-content label[for="src"] {
          display: none !important;
        }`,

        /* ✅ ENABLE IMAGE UPLOAD FROM DEVICE */
        file_picker_types: "image",

        file_picker_callback: (callback: any) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "my_unsigned_preset");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/du5txczqe/image/upload",
              {
                method: "POST",
                body: data,
              }
            );

            const json = await res.json();

            // ✅ THIS LINE FIXES IT
            callback(json.secure_url, { alt: file.name });
          };

          input.click();
        },

        /* ✅ DRAG & DROP + PASTE SUPPORT */
        automatic_uploads: true,
        paste_data_images: true,

        /* ✅ HANDLE DRAG & DROP UPLOAD */
        images_upload_handler: async (blobInfo: any) => {
          const data = new FormData();
          data.append("file", blobInfo.blob());
          data.append("upload_preset", "my_unsigned_preset");

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/du5txczqe/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const json = await res.json();
          return json.secure_url;
        },
      }}
    />
  );
}