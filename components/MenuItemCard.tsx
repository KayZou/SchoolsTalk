"use client";
import { 
  MessageSquareShare, 
  SquarePlus, 
  CalendarCheck, 
  Videotape,
  LucideIcon 
} from "lucide-react";

// Map of icon names to actual icon components
const iconMap: Record<string, LucideIcon> = {
  "message-square-share": MessageSquareShare,
  "square-plus": SquarePlus,
  "calendar-check": CalendarCheck,
  "videotape": Videotape,
};

// Shorthand names for easier use
const shortNameMap = {
  meet: "message-square-share",
  join: "square-plus",
  schedule: "calendar-check",
  recordings: "videotape",
};

interface MenuItemCardProps {
  iconName: keyof typeof shortNameMap | string; // Accept both shorthand names or direct icon names
  title: string;
  bgColor: string;
  hoverColor: string;
  size?: number;
  strokeWidth?: number;
  handleClick?: () => void;
}

const MenuItemCard = ({
  iconName,
  title,
  bgColor,
  hoverColor,
  size = 50,
  strokeWidth = 2,
  handleClick,
}: MenuItemCardProps) => {
  // Get the actual icon name (either from the shorthand map or use directly)
  const actualIconName = iconName in shortNameMap 
    ? shortNameMap[iconName as keyof typeof shortNameMap] 
    : iconName;
  
  // Get the icon component
  const IconComponent = iconMap[actualIconName];

  return (
    <section
      className={`${bgColor} ${hoverColor} menu-item-card shadow-2xl`}
      onClick={handleClick}
    >
      <div>
        {IconComponent && <IconComponent size={size} strokeWidth={strokeWidth} color="white"/>}
      </div>
      <div className="">
        <h1 className="text-2xl text-white font-black">{title}</h1>
      </div>
    </section>
  );
};

export default MenuItemCard;