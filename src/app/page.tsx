"use client"
import Loader from "@/components/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleRight, FaRegCopy, FaRegPaperPlane } from "react-icons/fa";
import Link from "next/link";

interface Item {
  id: number;
  text: string;
}
export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [save, setSave] = useState<boolean | undefined>(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [items, setItems] = useState<Item[]>(() => {
    const savedImages = localStorage.getItem("myImages");
    if (savedImages) {
      return JSON.parse(savedImages) as Item[];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("myImages", JSON.stringify(items));
  }, [items]);

  const saveImage = async (e: any) => {
    e.preventDefault()
    setSave(true)
    try {
      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, value }), // send the string as a JSON object
      });
      // Handle success, such as updating UI or showing a success message
      if (response.ok) {
        const data = await response.json();
        setItems([...items, data.uploadResponse]); // Add to items array
        setSave(false);
        onSaveImage()
      }
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  }

  const onSaveImage = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000); // Reset status after 2 seconds
  };
  const handlePrompt = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setUrl("")
    try {
      const response = await fetch('/api/dalle3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value }), // send the string as a JSON object
      });
      // Handle success, such as updating UI or showing a success message
      if (response.ok) {
        const data = await response.json();
        setUrl(data.image_url)
        // setValue("")
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error uploading file:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="relative text-xl font-semibold capitalize ">
          AI image manager with Dall-E 3 and Cloudinary
        </h1>
        <Link className="flex items-center justify-center capitalize text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-3.5 py-2.5" href="/images/page">
         <span>image database</span>
            <FaAngleRight size={14} />
        </Link>
      </div>

      <div>
        {loading && <Loader size={100} /> }
        {url &&
          <div className="flex flex-col items-center justify-center">
            <Image src={url} onLoadingComplete={() => setLoading(false)} width={500} height={500} alt="ai image" className="rounded-2xl" />
            {!loading &&
              <div>
                <button type="submit" onClick={saveImage} className="flex justify-center text-white border bg-blue-700 hover:bg-blue-800 font-medium relative rounded-lg text-xs px-2.5 py-2.5 text-center mt-3">
                  {save ? <Loader /> : "Save image"}
                </button>
                {saveStatus && <p className="text-center">Image saved!</p>}
              </div>
            }
          </div>
        }
      </div>
      <div className="flex items-center justify-between">
        <input type="text" value={value} placeholder="Enter an image prompt" name="value" onChange={(e) => { setValue(e.target.value) }}
          className="bg-gray-100 placeholder:text-gray-400 disabled:cursor-not-allowed border border-gray-500 text-gray-900 text-sm rounded-lg block p-3.5 mr-2 w-[600px]"
          required
        />
        <button className="text-blue-700 relative right-[3.5rem] font-medium p-5 rounded-lg text-sm transition-all sm:w-auto px-5 py-2.5 text-center" onClick={handlePrompt}>
          <FaRegPaperPlane />
        </button>
      </div>
    </main>
  );
}

