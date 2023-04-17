import React from "react";

const DropzoneThumb = ({ src, onImgLoad, deleteImage, index }) => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded select-none block">
      <button
        className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
        type="button"
        onClick={() => deleteImage(index)}
      >
        <svg
          className="w-4 h-4 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <img
        className="object-cover w-auto h-full border-4 border-white preview block"
        src={src}
        // Revoke data uri after image is loaded
        onLoad={onImgLoad}
      />
    </div>
  );
};

export default DropzoneThumb;
