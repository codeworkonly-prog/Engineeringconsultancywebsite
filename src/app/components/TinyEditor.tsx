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
          bullist numlist outdent indent | link image media | \
          removeformat | code preview fullscreen",
      }}
    />
  );
}