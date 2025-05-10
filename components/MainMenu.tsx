"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MainMenu = () => {
  const { user } = useUser();
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [meetingState, setMeetingState] = useState<
    "Schedule" | "Instant" | undefined
  >(undefined);

  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user) return router.push("/login");
    if (!client) return router.push("/");
    try {
      if (!values.dateTime) {
        toast("Please select a date and a time", {
          duration: 3000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || `Meeting of ${startsAt}`;
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      await call.updateCallMembers({
        update_members: [{ user_id: user.id }],
      });
      if (meetingState === "Instant") {
        router.push(`/meeting/${call.id}`);
        toast("Setting up your meeting", {
          duration: 3000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });
      }
      if (meetingState === "Schedule") {
        router.push("/upcoming");
        toast(`Your meeting is scheduled at ${values.dateTime}`, {
          duration: 5000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });
      }
    } catch (error: any) {
      toast(`Failed to create a meeting ${error?.message}`, {
        duration: 3000,
        className: "!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center",
      });
    }
  };

  useEffect(() => {
    if (meetingState) {
      createMeeting();
    }
  }, [meetingState]);

  if (!client || !user) return <Loading />;

  return (
    <section className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <MenuItemCard
              iconName="meet"
              title="New Meeting"
              bgColor="bg-cyan-700"
              hoverColor="hover:bg-cyan-500"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-gray-200 px-16 py-10 text-gray-900 !rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black leading-relaxed text-center">
              Start an Instant Meeting 🤝
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center">
              Add a meeting description
              <Textarea
                className="inputs p-5"
                rows={4}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
              <Button
                className="mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-100 transition ease-in-out delay-75 duration-700 hover-translate-y-1 cursor-pointer"
                onClick={() => setMeetingState("Instant")}
              >
                Create Meeting
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <MenuItemCard
              iconName="join"
              title="Join Meeting"
              bgColor="bg-blue-700"
              hoverColor="hover:bg-blue-500"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-gray-200 px-16 text-gray-900 !rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black leading-relaxed text-center mb-5">
              Type the meeting link 🔗
            </DialogTitle>
            <DialogDescription>
              <Input
                type="text"
                placeholder="Meeting Link"
                onChange={(e) => setValues({ ...values, link: e.target.value })}
              />
              <Button className="mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-100 transition ease-in-out delay-75 duration-700 hover-translate-y-1 cursor-pointer">
                Join Meeting
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <MenuItemCard
              iconName="schedule"
              title="Schedule Meeting"
              bgColor="bg-purple-700"
              hoverColor="hover:bg-purple-500"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-gray-200 px-16 py-10 text-gray-900 !rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black leading-relaxed text-center mb-5">
              Schedule Meeting 🗓️
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              Add a meeting description
              <Textarea
                className="inputs p-5"
                rows={4}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </DialogDescription>
            <div className="flex w-full flex-col gap-2.5">
              <label
                className="text-base font-normal leading-[22.4px] text-sky-4"
                htmlFor="datepicker"
              >
                Select Date and Time
              </label>
              <DatePicker
                id="datepicker"
                preventOpenOnFocus
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <Button
              className="!mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 px-10 hover:bg-blue-900 hover:scale-100 transition ease-in-out delay-75 duration-700 hover-translate-y-1 cursor-pointer"
              onClick={() => setMeetingState("Schedule")}
            >
              Submit
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <MenuItemCard
        iconName="recordings"
        title="View Recordings"
        bgColor="bg-pink-700"
        hoverColor="hover:bg-pink-500"
        handleClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MainMenu;
