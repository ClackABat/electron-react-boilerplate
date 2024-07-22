import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '../icons/ImageIcon';
import AddToImagesIcon from '../icons/AddToImagesIcon';

export type FileDropzoneProps = {
  onDrop: (files: File[]) => void;
};

export default function FileDropzone(props: FileDropzoneProps) {
  const { onDrop } = props;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full h-full min-h-[4rem] flex justify-center items-center flex-col border border-gray-800 border-dashed bg-gray-100"
    >
      <input {...getInputProps()} />
      <div className="flex justify-center items-center gap-4">
        <AddToImagesIcon />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
