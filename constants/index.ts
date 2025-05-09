import { Home, ArrowLeftCircle, Video, User, CalendarDays } from "lucide-react"

export const navLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: CalendarDays,
    route: "/upcomings",
    label: "Upcomings",
  },
  {
    icon: ArrowLeftCircle,
    route: "/previous",
    label: "Previous",
  },
  {
    icon: Video,
    route: "/recordings",
    label: "Recordings",
  },
  {
    icon: User,
    route: "/my-room",
    label: "My Room",
  },
];
