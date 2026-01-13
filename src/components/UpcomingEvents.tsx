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


export default function UpcomingEvents() {
    const [data, setData] = useState<EventData[] | null>(null);
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [dataError, setDataError] = useState<boolean>(false);


     useEffect(()=>{
            async function fetchUpcoming() {
                try {
                    const response = await fetch("/connect/get-scheduled-events/");
                    if (!response.ok) {
                        setDataLoading(false);
                        setDataError(true);
                    }
    
                    const result: BluditScheduledResponse["data"] = await response.json();
                    
                    if(result.length < 1){
                        setDataLoading(false);
                        return;
                    }
                    const events: EventData[] = result.map((item) => ({
                        title: item.title,
                        description: item.description,
                        image: item.coverImage ? String(item.coverImage) : "/frown.svg",
                        date: item.date + ` ${FormatTime(item.dateRaw.split(" ")[1])}`,
                        location: String(marked((item.content).trim())).slice(3, -4),
                    }));
                    
                    setData(events);
                    setDataLoading(false);

                } catch (error: any) {
                    console.log(error)
                    setDataLoading(false);
                    setDataError(true);
                }
            }
            
            fetchUpcoming();
            },[])


    return (
        <section className="flex justify-center w-full py-5 bg-linear-0 px-20">
            { !dataLoading && !data && !dataError &&
                <div className="flex flex-col justify-center items-center gap-3 border-gray-300 border-2 rounded-lg p-5 shadow-md my-4 h-50 bg-white">
                    <h3 className="text-center text-lg font-semibold">There are no upcoming events</h3>
                    <img src="/frown.svg" />
                </div>
            }
            
            { dataLoading &&
                <section className="hidden sm:flex justify-center md:px-20 gap-4">
                { Array.from({ length: 3 }).map((_, i) => 
                    <article key={i} className="bg-neutral-500 animate-pulse w-50 h-75 rounded-lg" />
                )}
                </section>
            }

            { dataLoading &&
                <section className="flex sm:hidden justify-center md:px-20 gap-4">
                { Array.from({ length: 2 }).map((_, i) => 
                    <article key={i} className="bg-neutral-500 animate-pulse w-40 h-60 rounded-lg" />
                )}
                </section>
            }
            
            {
                data && !dataLoading &&
                <CardCarousel data={data} cardType="event" />
            }
           
        </section>
    )
}


