"use client";

import { useUser } from "@clerk/nextjs";
import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import Alert from "./Alert";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { user } = useUser();
  if (!user) return;
  const call = useCall();
  if (!call)
    throw new Error(
      "useStreamCall must be used with in a StreamCall component"
    );
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);
  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
        iconUrl="Clock"
        iconColor="#FFD700"
      />
    );
  if (callHasEnded)
    return (
      <Alert
        title="The call has already been ended by the host"
        iconUrl="callEnded"
      />
    );
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3 text-black">
      <h1 className="text-center text-2xl font-bold">Meeting Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label
          htmlFor=""
          className="flex items-center justify-center gap-2 font-medium"
        >
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-3xl bg-blue-500 p-6 hover:bg-blue-800 hover:scale-125 transition ease-in-out delay-150 duration-300"
        onClick={() => {
          call.join();
          call.updateCallMembers({ update_members: [{ user_id: user.id }] });
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};
export default MeetingSetup;
