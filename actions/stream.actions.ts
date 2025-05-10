"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const streamApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const streamSecretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("NO user is logged in");
  if (!streamApiKey) throw new Error("Stream api key is not valid");
  if (!streamSecretKey) throw new Error("Stream secret key is not valid");
  const client = new StreamClient(streamApiKey, streamSecretKey);
  const userId: string = user.id;
  const validity = 60 * 60;
  const token = client.generateUserToken({
    user_id: userId,
    validity_in_seconds: validity,
  });
  return token as string;
};
