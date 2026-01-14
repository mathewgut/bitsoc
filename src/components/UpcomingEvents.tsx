import { useEffect, useState } from "react";
import CardCarousel from "./CardCarousel";
import type { BluditResponse, BluditScheduledResponse } from "@/types";
import { marked } from "marked";


interface EventData {
    title:string;
    description:string
    image:string;
    date?:string;
    location?:string;
}

function FormatTime (time:string) {
    time = time.slice(0,-3);
    let hour = Number(time.split(":")[0]);
    const minute = Number(time.split(":")[1]);
    let suffix = "am"

    if (hour > 12){
        hour -= 12;
        suffix = "pm";
    }
    
    return `(${hour}:${minute < 10 ? String(minute) + "0" : minute} ${suffix})`;
}


export default function UpcomingEvents({data}:{data:BluditScheduledResponse}) {
    let events: EventData[];


    if(data.data.length >=1){
        events = data.data.map((item) => ({
            title: item.title,
            description: item.description,
            image: item.coverImage ? String(item.coverImage) : "/frown.svg",
            date: item.date + ` ${FormatTime(item.dateRaw.split(" ")[1])}`,
            location: String(marked((item.content).trim())).slice(3, -4),
        }));
    }
    else {
        events = [{title:"", description:"",image:""}]
    }

    return (
        <section className="flex justify-center w-full py-5 bg-linear-0 px-20">
            { data.data.length < 1 &&
                <div className="flex flex-col justify-center items-center gap-3 border-gray-300 border-2 rounded-lg p-5 shadow-md my-4 h-50 bg-white">
                    <h3 className="text-center text-lg font-semibold">There are no upcoming events</h3>
                    <img src="/frown.svg" />
                </div>
            }
            
            {
                data.data.length >= 1 &&
                <CardCarousel data={events} cardType="event" />
            }
           
        </section>
    )
}


