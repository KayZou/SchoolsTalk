"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Link as LinkIcon, 
  Calendar, 
  Ban, 
  PhoneOff,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  type LucideIcon 
} from "lucide-react";
import Link from "next/link";

// Map of icon names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  "Canceled": Ban,
  "callEnded": PhoneOff,
  "Calendar": Calendar,
  "Clock": Clock,
  "Alert": AlertCircle,
  "Success": CheckCircle,
  "Close": X,
};

interface AlertProps {
  title: string;
  iconUrl?: string; // Can be a URL or a key from the iconMap
  iconColor?: string;
  iconSize?: number;
}

const Alert = ({ title, iconUrl, iconColor = "white", iconSize = 72 }: AlertProps) => {
  // Check if the iconUrl is a key in our icon map
  const LucideIconComponent = iconUrl && iconMap[iconUrl];

  return (
    <section className="flex justify-center items-center mt-5">
      <Card className="w-full max-w-[520px] border-none bg-gray-500 p-6 py-9 text-white shadow-2xl">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex justify-center items-center">
                  {LucideIconComponent ? (
                    // Render Lucide icon if it's in our map
                    <LucideIconComponent 
                      size={iconSize} 
                      color={iconColor}
                      strokeWidth={2}
                    />
                  ) : (
                    // Fallback to Image if it's a URL
                    <Image src={iconUrl} width={iconSize} height={iconSize} alt="icon" />
                  )}
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>
            <Button asChild className="bg-gray-900 rounded-2xl">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;