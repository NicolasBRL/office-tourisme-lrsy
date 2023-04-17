import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DropzoneThumb from "./DropzoneThumb";

const Dropzone = ({
  files,
  setFiles,
  setInputFiles,
  setRemovedFiles = false,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);

      setInputFiles((prevState) => [...prevState, acceptedFiles[0]]);
    },
  });

  const [thumbs, setThumbs] = useState();

  const handleDeleteImage = (index) => {
    if (!files[index].id) {
      setFiles(files.filter((v, i) => i !== index));
      files.map((file) => {
        if (file.length)
          Object.assign(file[0], {
            preview: URL.createObjectURL(file[0]),
          });
      });
    } else if (setRemovedFiles) {
      setRemovedFiles((prevState) => [...prevState, files[index].id]);
      setFiles(files.filter((v, i) => i !== index));
    }
  };

  useEffect(() => {
    if (files)
      setThumbs(
        files.map((filesList, index) =>
          filesList.length ? (
            filesList.map((file) => (
              <DropzoneThumb
                key={index}
                index={index}
                src={file.preview}
                onImgLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                deleteImage={handleDeleteImage}
              />
            ))
          ) : (
            <DropzoneThumb
              key={index}
              index={index}
              src={`http://localhost:8000/storage/${filesList.url}`}
              deleteImage={handleDeleteImage}
            />
          )
        )
      );

    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((filesList) => {
        if (filesList && typeof filesList != "object")
          filesList.map((file) => URL.revokeObjectURL(file.preview));
      });
  }, [files]);

  return (
    <section className="container">
      <div
        {...getRootProps()}
        className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
      >
        <input
          accept="*"
          type="file"
          multiple
          className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
          {...getInputProps()}
          name="imagesLieu[]"
        />

        <div className="flex flex-col items-center justify-center py-10 text-center">
          <svg
            className="w-6 h-6 mr-1 text-current-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="m-0">
            Faites glisser vos fichiers ici ou cliquez dans cette zone.
          </p>
        </div>
      </div>
      <aside className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
        {thumbs}
      </aside>
    </section>
  );
};

export default Dropzone;
