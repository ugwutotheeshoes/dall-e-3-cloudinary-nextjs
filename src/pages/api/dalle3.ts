import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_DALL_E_3_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt } = req.body; // Extract the prompt from the request body
    const uploadResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = uploadResponse.data[0].url;
    res.status(200).json({ image_url });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}