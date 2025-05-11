"use client";
import { useUser } from "@clerk/nextjs";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import Loading from "./Loading";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const { user } = useUser();
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const pathname = usePathname();

  if (!user) return <Loading />;
  if (callingState !== CallingState.JOINED) return <Loading />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden pt-4 text-white">
      <Button
        className="ml-5 font-semibold bg-gray-900 hover:scale-110 rounded-3xl"
        onClick={() => {
          const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
          navigator.clipboard.writeText(meetingLink);
          toast("Meeting Link Copied", {
            duration: 3000,
            className: "bg-gray-300 rounded-3xl text-center",
          });
        }}
      >
        Invite People
      </Button>

      <div className="relative flex h-[calc(100vh-150px)] items-center justify-center">
        <div
          className={cn(
            "flex h-full w-full items-center animate-fade-in",
            showParticipants ? "max-w-[75%]" : "max-w-[1000px]"
          )}
        >
          <CallLayout />
        </div>

        {showParticipants && (
          <div className="h-full w-[25%] min-w-[250px] bg-gray-900 rounded-lg overflow-auto">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 pb-4">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-gray-700">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-black text-white bg-black">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(
                      item.toLowerCase().replace(/-/g, "-") as CallLayoutType
                    )
                  }
                >
                  {item}
                </DropdownMenuItem>
                {index < 2 && (
                  <DropdownMenuSeparator className="border-black" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className={cn(
            "cursor-pointer rounded-2xl px-4 py-2 hover:bg-gray-700 transition-colors",
            showParticipants ? "bg-blue-700" : "bg-[#19232d]"
          )}
        >
          <Users size={20} className="text-white" />
        </button>

        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
