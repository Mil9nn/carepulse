"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="file-upload-wrapper cursor-pointer mt-3"
    >
      <input {...getInputProps()} className="file-upload" />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="upload-image"
          className="overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="space-y-2 mt-2">
            <p className="file-upload-text text-center text-xs">
              <span className="text-green-500">Click to upload</span>
              <span className="hidden sm:inline">
                {" "}
                or drag & drop files here
              </span>
            </p>
            <p className="file-upload-text text-xs">
              svg, png, jpg or gif (max 800×400)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
