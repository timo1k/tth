"use client";
import { useState } from "react";
import { ref, uploadBytes, StorageReference } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnPs18NOhGcVCtgyrxlSRSj9ePqVMxJY4",
  authDomain: "temple-trading-hub-tth.firebaseapp.com",
  projectId: "temple-trading-hub-tth",
  storageBucket: "temple-trading-hub-tth.appspot.com",
  messagingSenderId: "64770184657",
  appId: "1:64770184657:web:fa85fbd041ff27fb487cf0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

const CreateListing: React.FC = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef: StorageReference = ref(
      storage,
      `images/${imageUpload.name + uuidv4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image uploaded");
    });
  };

  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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