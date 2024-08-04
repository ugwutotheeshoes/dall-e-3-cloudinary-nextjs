"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaAngleRight, FaCheckCircle, FaRegCopy, FaRegTimesCircle } from "react-icons/fa";
import "../../app/globals.css"
import Image from 'next/image';
import CopyToClipboard from 'react-copy-to-clipboard';

type ImageProp = string;

export default function SavedImages() {
  const [images, setImages] = useState<ImageProp[]>([]);
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

  useEffect(() => {
    const storedimages = localStorage.getItem('myImages');
    if (storedimages) {
      setImages(JSON.parse(storedimages).reverse());
    }
  }, []);

  const deleteImage = (item: any) => {
    const updatedList = images.filter((id) => id !== item)
    setImages(updatedList);
    localStorage.setItem('myImages', JSON.stringify(updatedList));
  }

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 1000); // Reset status after 2 seconds
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="flex items-center justify-between w-full mb-10">
        <h1 className="relative text-xl font-semibold capitalize">
        Media Library
        </h1>
        <Link className="flex items-center justify-center capitalize text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-3.5 py-2.5" href="/">
          <span>
            homepage
          </span>
          <FaAngleRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8 my-8">
        {images.map((item) => (
          <div key={item}>
            <div className="relative group flex items-start">
              <CopyToClipboard text={item} onCopy={onCopyText}>
                <button className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 text-2xl font-semibold transition duration-200 ease-in-out text-blue-500 bg-white rounded-lg p-1">
                  {copyStatus ?
                    <FaCheckCircle />
                    :
                    <FaRegCopy />
                  }
                </button>
              </CopyToClipboard>
              <Image src={item} width={200} height={200} alt="ai image" />
              <button onClick={() => deleteImage(item)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-2xl font-semibold text-red-500 transition duration-200 bg-white rounded-lg p-1 ease-in-out">
                <FaRegTimesCircle />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
