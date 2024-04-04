"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import React from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { Item } from "@radix-ui/react-select";


interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

export default function Page({ params }: any) {
  // const [projects, setProjects] = useState<Project[]>([]);
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

  // Filter projects based on the specific link
  const id = `${params.id}`; // Change this to your desired link
  const filteredItems = users.filter((item) => item.id === id);

  if (filteredItems.length === 0) {
    return <div>Loading...</div>; // Or handle the case when the item with the given ID is not found
  }

  const item = filteredItems[0];

  return (
    <div className="flex justify-center items-center h-screen">
      <BackgroundGradientDemo project={item} />
    </div>
  );
}
function BackgroundGradientDemo({ project }: { project: Items }) {
  return (
    <div className="max-w-sm rounded-[22px] overflow-hidden">
      <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Image
          src={project.link}
          alt="NOT FOUND"
          width={200}
          height={200}
          className="object-cover"
        />
        <div className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {project.title}
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {project.description}
        </div>
        <br></br>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <h1>contant me: {project.user_id}</h1>
        </div>

        {/* <Link href={project.link}>LINKKKKKK</Link> */}
      </BackgroundGradient>
    </div>
  );
}
