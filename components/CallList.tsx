"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Alert from "./Alert";
import { Call } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [isRecordingsLoading, setIsRecordingsLoading] = useState(false);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls || [];
      case "recordings":
        return recordings || [];
      case "upcoming":
        return upcomingCalls || [];
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        setIsRecordingsLoading(true);
        if (!callRecordings || callRecordings.length === 0) {
          setRecordings([]);
          return;
        }

        const callData = await Promise.all(
          callRecordings.map((meeting) =>
            meeting.queryRecordings().catch(() => ({ recordings: [] }))
          )
        );

        const fetchedRecordings = callData
          .filter(
            (call) => call && call.recordings && call.recordings.length > 0
          )
          .flatMap((call) => call.recordings);

        setRecordings(fetchedRecordings);
      } catch (error) {
        console.error("Error fetching recordings:", error);
        setRecordings([]);
      } finally {
        setIsRecordingsLoading(false);
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();

  // Debug information
  console.log(`CallList for ${type}:`, {
    calls: calls?.length || 0,
    upcomingCalls: upcomingCalls?.length || 0,
    endedCalls: endedCalls?.length || 0,
    recordings: recordings?.length || 0,
    isLoading,
  });

  if (!calls || calls.length === 0) {
    return <Alert title={`No ${type} calls available`} iconUrl="Canceled" />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {calls.map((meeting: Call | CallRecording) => {
        // Determine if meeting is a Call or CallRecording
        const isRecording = type === "recordings";

        // Extract meeting ID safely
        const meetingId =
          isRecording && (meeting as CallRecording).url
            ? (meeting as CallRecording).url
            : !isRecording
            ? (meeting as Call).id
            : undefined;

        // Format date safely
        let dateString = "No date available";
        try {
          if (isRecording && (meeting as CallRecording).start_time) {
            dateString = new Date(
              (meeting as CallRecording).start_time!
            ).toLocaleString();
          } else if (
            !isRecording &&
            (meeting as Call).state?.startedAt instanceof Date
          ) {
            dateString = new Date(
              (meeting as Call).state.startedAt!
            ).toLocaleString();
          }
        } catch (error) {
          console.error("Error formatting date:", error);
        }

        return (
          <MeetingCard
            call={isRecording ? undefined : (meeting as Call)}
            key={
              meetingId || `meeting-${Math.random().toString(36).substring(7)}`
            }
            type={type}
            icon={
              type === "ended"
                ? "callEnded"
                : type === "recordings"
                ? "Clock"
                : "Calendar"
            }
            title={
              isRecording
                ? (meeting as CallRecording).filename?.substring(0, 20) ||
                  "No Description"
                : (meeting as Call).state?.custom?.description ||
                  "No Description"
            }
            date={dateString}
            isPreviousMeeting={type === "ended"}
            link={
              isRecording
                ? (meeting as CallRecording).url || "#"
                : `${
                    process.env.NEXT_PUBLIC_BASE_URL || ""
                  }/meeting/${meetingId}`
            }
            buttonIcon1={isRecording ? "Play" : "Video"}
            buttonText={isRecording ? "Play" : "Join Meeting"}
            handleClick={() => {
              try {
                if (isRecording) {
                  const url = (meeting as CallRecording).url;
                  if (url) {
                    window.open(url, "_blank");
                  } else {
                    console.error("Recording URL is undefined");
                  }
                } else {
                  router.push(`/meeting/${meetingId}`);
                }
              } catch (error) {
                console.error("Navigation error:", error);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default CallList;
