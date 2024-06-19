/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "oaidalleapiprodscus.blob.core.windows.net",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  