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
          "undo redo | formatselect | bold italic underline | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist | link image media | \
    code preview fullscreen",

        automatic_uploads: true,
        paste_data_images: true,

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