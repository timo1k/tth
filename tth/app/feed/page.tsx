"use client";
import React, { useState, useEffect } from "react";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";



interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

interface Props {
  projects: Items[];
}

const items = ["Books", "Electronics"];

export default function Home() {
  const [projects, setProjects] = useState<Items[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [users, setUsers] = useState<Items[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const querySnapshot = await getDocs(collection(db, "Item"));
      const usersData: Items[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      console.log(usersData);
      setUsers(usersData);
    }

    fetchItems();
  }, []);


  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "Item"));
        const usersData: Items[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        console.log(usersData);

        const filteredItems = selectedItem
          ? usersData.filter((item) => item.tag === selectedItem)
          : usersData;

        setUsers(filteredItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [selectedItem]);

  const handleSelectChange = (value: string) => {
    setSelectedItem(value === selectedItem ? null : value); // Toggle selection if the same item is clicked again
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <label htmlFor="item" className="text-white">
        <br />
        <select
          id="item"
          value={selectedItem || ""} // Set the value to selectedItem or an empty string
          onChange={(e) => {
            handleSelectChange(e.target.value);
          }}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="">Default</option>
          {items.map((selectedItem) => (
            <option key={selectedItem} value={selectedItem}>
              {selectedItem}
            </option>
          ))}
        </select>
      </label>
      <div className="text-center">
        {/* <div>
          <CardHoverEffectDemo projects={projects} />
        </div> */}
        <div>
          <CardHoverEffectDemo projects={users} />
        </div>
      </div>
    </div>
  );
}

function CardHoverEffectDemo({ projects }: Props) {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
