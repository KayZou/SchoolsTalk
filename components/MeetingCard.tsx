"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Call } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import Members from "./Members";
import { 
  Calendar, 
  Clock, 
  Phone, 
  Play,
  ArrowRight,
  CalendarCheck,
  Video,
  PhoneOff 
} from "lucide-react";

// Map of icon names to Lucide components
const iconMap = {
  Calendar: Calendar,
  Clock: Clock,
  Phone: Phone,
  Play: Play,
  ArrowRight: ArrowRight,
  CalendarCheck: CalendarCheck,
  Video: Video,
  callEnded: PhoneOff,
};

type IconName = keyof typeof iconMap;

interface MeetingCardProps {
  title: string;
  date: string;
  icon: IconName;
  isPreviousMeeting?: boolean;
  buttonIcon1?: IconName;
  buttonText?: string;
  call?: Call;
  type: string;
  handleClick?: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  buttonText = "Join",
  handleClick,
  call,
  type,
  link,
}: MeetingCardProps) => {
  // Get the appropriate icon component
  const IconComponent = iconMap[icon] || Calendar;
  const ButtonIconComponent = buttonIcon1 ? iconMap[buttonIcon1] : undefined;

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-3xl bg-blue-200 px-5 py-8 xl:max-w-[568px] text-black scale-90 shadow-2xl">
      <article className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IconComponent size={24} />
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      
      <article className={cn("flex justify-center relative flex-col gap-3", {})}>
        <div>
          {type === "ended" && call && <Members call={call} />}
        </div>
        
        {!isPreviousMeeting && (
          <div className="flex gap-5">
            <Button 
              onClick={handleClick} 
              className="rounded bg-blue-700 p-4 hover:bg-blue-400 px-6 flex items-center gap-2"
            >
              {ButtonIconComponent && <ButtonIconComponent size={18} />}
              {buttonText}
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;