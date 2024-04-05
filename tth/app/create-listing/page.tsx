"use client"
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, StorageReference } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage, firestore } from "../firebase";
import { auth } from "../../app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const CreateListing: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        //if user not log in 
        setCurrentUser(null);
        window.location.href = "/login";
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const uploadImage = async () => {
    if (!imageUpload || !currentUser) return;

    const imageRef: StorageReference = ref(storage, `images/${imageUpload.name + uuidv4()}`);

    try {
      // Upload image to storage
      await uploadBytes(imageRef, imageUpload);

      // Get download URL of the uploaded image
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. Download URL:", downloadUrl);

      // Set the download URL in the state
      setImageUrl(downloadUrl);

      // Save data to Firestore
      const docRef = await addDoc(collection(firestore, "Item"), {
        title: title,
        description: description,
        link: downloadUrl,
        user_id: currentUser.uid, // Save the current user's ID with the data
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset input fields after submission
      setTitle("");
      setDescription("");
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
      <p>We need to add other things to offer user items as well.</p>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            setImageUpload(event.target.files[0]);
          }
        }}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc", color: "black" }}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc", color: "black" }}
      ></textarea>
      <br />
      <button type="button" onClick={uploadImage} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}> Upload </button>

      {/* Render the uploaded image */}
      {imageUrl && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", width: "200px", margin: "auto" }}>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default CreateListing;
