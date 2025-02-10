"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "../../lib/suapase"; // Import Supabase client
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({ file, setfile, uploaded, setuploaded,iseditmode,istrue=false }) => {
  const inputref = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleimage = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setfile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      await uploadToSupabase(selectedFile);
    }
  };

  const dragover = (event) => {
    event.preventDefault();
  };

  const drop = async (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setfile(droppedFile);
      setImagePreview(URL.createObjectURL(droppedFile));
      await uploadToSupabase(droppedFile);
    }
  };

  // Upload image to Supabase
  const uploadToSupabase = async (imageFile) => {
    setUploading(true);
    const fileName = `${Date.now()}-${imageFile.name}`; // Unique filename
    const { data, error } = await supabase.storage
      .from("productimage") // Replace with your Supabase storage bucket name
      .upload(`uploads/${fileName}`, imageFile);

    if (error) {
      console.error("Error uploading image:", error.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("productimage")
      .getPublicUrl(`uploads/${fileName}`);

    if (publicUrlData) {
      setuploaded(publicUrlData.publicUrl); // Set uploaded image URL
    }

    setUploading(false);
  };

  function handleRemoveImage() {
    setfile(null);
    setImagePreview(null);
    setuploaded(null);
    if (inputref.current) {
      inputref.current.value = "";
    }
  }

  return (
    <div className={`w-full  mt-4 ${istrue ? "" :"max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload image</Label>
      <div
        onDragOver={dragover}
        onDrop={drop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputref}
          required
          disabled={iseditmode}

        //   accept="image/*"
          onChange={handleimage}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex flex-col items-center">
            {uploading ? (
              <Skeleton className="w-full h-10"/>
            ) : (
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="max-h-32 mb-4 rounded-lg"
              />
            )}
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
