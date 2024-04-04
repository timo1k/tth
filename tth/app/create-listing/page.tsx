import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { auth, firestore } from "../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const CreateListing: React.FC = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out
        window.location.href = "/login";
      }
    });

    // Cleanup function
    return () => {
      setImageUpload(null); // Reset imageUpload state
      setImageUrl(null); // Reset imageUrl state
      setTitle(""); // Reset title state
      setDescription(""); // Reset description state
    };
  }, []);

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const uploadImage = async () => {
    if (!imageUpload) return;

    const imageRef: StorageReference = ref(
      storage,
      `images/${imageUpload.name + uuidv4()}`
    );

    try {
      // Upload image to storage
      await uploadBytes(imageRef, imageUpload);

      // Get download URL of the uploaded image
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. Download URL:", downloadUrl);

      // Set the download URL in the state
      setImageUrl(downloadUrl);

      // Alert user about successful upload
      alert("Image uploaded");

      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

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
      <p>we need to add other things offer user items as well </p>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            setImageUpload(event.target.files[0]);
          }
        }}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={uploadImage}> Upload Image </button>

      {/* Render the uploaded image */}
      {imageUrl && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", width: "200px" }}>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default CreateListing;
