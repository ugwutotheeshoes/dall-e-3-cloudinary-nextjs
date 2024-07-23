"use server"
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const image_url = req.body.url; // Extract the prompt from the request body
        const timestamp = req.body.value + ' ' + Math.floor((Math.random() * 100) + 1);
        const trimmedString = timestamp.trim();
        const publicId = trimmedString.replace(/\s+/g, '-');
        console.log(publicId);
        const response = await cloudinary.uploader.upload(image_url, {
            resource_type: 'image',
            public_id: `${publicId}`,
            width: 150, height: 150, gravity: "face", radius: "max", crop: "fill",
        });
        const uploadResponse = response.secure_url;
        res.status(200).json({ uploadResponse });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

