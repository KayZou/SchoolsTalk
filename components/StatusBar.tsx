"use client"

import Image from "next/image"
import DateAndTime from "./DateAndTime"

const StatusBar = ()=>{
    return (
        <section className="flex flex-col gap-5 text-black items-center md:items-start">
            <DateAndTime />
            <Image src="/HomeImage.png" height={400} width={400} alt="Home Image" className="mx-md:hidden -ml-16"/>
        </section>
    )
}
export default StatusBar