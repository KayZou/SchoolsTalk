"use client";
import { useUser } from "@clerk/nextjs";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { StreamVideo } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import Loading from "@/components/Loading";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    
    if (!API_KEY) {
      console.error("Stream API key is not defined");
      return;
    }

    const initializeClient = async () => {
      try {
        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: user?.id,
            name: user.firstName || user?.lastName || "User",
            image: user?.imageUrl,
          },
          tokenProvider,
        });
        
        setVideoClient(client);
      } catch (error) {
        console.error("Error initializing Stream client:", error);
      }
    };

    initializeClient();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
        setVideoClient(null);
      }
    };
  }, [user, isLoaded]);

  if (!videoClient) return <Loading />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamProvider;