"use client";

import { useEffect, useState } from "react";

const DateAndTime = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(now);
  });
  useEffect(() => {
    const interValId = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        new Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(now)
      );
    }, 1000);
    return () => clearInterval(interValId);
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-extrabold lg:text-7xl"> {time} </h1>
      <p className="text-lg font-medium lg:2xl"> {date} </p>
    </div>
  );
};
export default DateAndTime;
