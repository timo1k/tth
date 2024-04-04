"use client";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";
import { auth } from "../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";

const CreateListing: React.FC = () => {
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
          // User is signed out
          window.location.href = "/login";
        }
      });
    }, []);

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef: StorageReference = ref(
      storage,
      `images/${imageUpload.name + uuidv4()}`
    );

    try {
      // Upload image to storage
      await uploadBytes(imageRef, imageUpload);

      // Get download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. Download URL:", imageUrl);

      // Optionally, you can use the download URL for further processing (e.g., saving it to a database)
      // Handle your logic here...

      // Alert user about successful upload
      alert("Image uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      <p>we need to add other things offer user items as well </p>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            setImageUpload(event.target.files[0]);
          }
        }}
      />
      <button onClick={uploadImage}> Upload Image </button>
    </div>
  );
};

export default CreateListing;
